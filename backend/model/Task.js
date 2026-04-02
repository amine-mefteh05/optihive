import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'in-review', 'completed', 'overdue'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    // Liée à une feature (Sprint 2)
    feature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feature',
      required: [true, 'Task must belong to a feature'],
    },
    // Liée à un projet (pour les requêtes dashboard)
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Task must belong to a project'],
    },
    // Assignée à un membre
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // Créée par
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deadline: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ─── Index pour accélérer les requêtes dashboard ──────────────────────────────
taskSchema.index({ project: 1 });
taskSchema.index({ feature: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ deadline: 1 });

// ─── Auto overdue : si deadline dépassée et pas completed ────────────────────
taskSchema.pre('save', function () {
  if (
    this.deadline &&
    this.deadline < new Date() &&
    this.status !== 'completed'
  ) {
    this.status = 'overdue';
  }
});

const Task = mongoose.model('Task', taskSchema);
export default Task;