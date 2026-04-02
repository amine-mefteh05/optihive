import PDFDocument from 'pdfkit';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import Feature from '../models/Feature.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// GET /api/reports/:projectId
export const generateReport = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  
  const project = await Project.findById(projectId).populate('owner', 'name').populate('members', 'name');
  if (!project) return res.status(404).json({ message: 'Project not found' });

  // Only project members or admins
  const isMember = (
    project.owner._id.toString() === req.user.id ||
    project.members.some(m => m._id.toString() === req.user.id)
  );
  if (!isMember && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'name');
  const features = await Feature.find({ project: projectId });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Create PDF
  const doc = new PDFDocument({ margin: 50 });
  
  res.setHeader('Content-disposition', `attachment; filename=OptiHive-Report-${project.title.replace(/\s+/g, '-')}.pdf`);
  res.setHeader('Content-type', 'application/pdf');
  
  doc.pipe(res);

  // Header
  doc.fontSize(24).fillColor('#f59e0b').text('OptiHive Project Report', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(16).fillColor('#1f2937').text(`Project: ${project.title}`);
  doc.fontSize(12).fillColor('#4b5563').text(`Generated on: ${new Date().toLocaleDateString('fr-FR')}`);
  doc.moveDown(1);

  // Stats
  doc.fontSize(16).fillColor('#1f2937').text('Overview', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('#000000').text(`Owner: ${project.owner.name}`);
  doc.text(`Members: ${project.members.length}`);
  doc.text(`Features: ${features.length}`);
  doc.text(`Total Tasks: ${totalTasks}`);
  doc.text(`Completed: ${completedTasks}`);
  doc.text(`Overall Progress: ${progress}%`);
  doc.moveDown(2);

  // Task List
  doc.fontSize(16).fillColor('#1f2937').text('Task Breakdown', { underline: true });
  doc.moveDown(0.5);

  tasks.forEach(task => {
    let color = '#3b82f6'; // todo
    if (task.status === 'completed') color = '#10b981';
    if (task.status === 'in-progress') color = '#f59e0b';
    if (task.status === 'overdue') color = '#ef4444';

    doc.fontSize(12).fillColor(color).text(`[${task.status.toUpperCase()}] `, { continued: true });
    doc.fillColor('#000000').text(task.title);
    
    doc.fontSize(10).fillColor('#6b7280').text(`   Priority: ${task.priority} | Assigned: ${task.assignedTo ? task.assignedTo.name : 'Unassigned'}`);
    doc.moveDown(0.5);
  });

  doc.end();
});
