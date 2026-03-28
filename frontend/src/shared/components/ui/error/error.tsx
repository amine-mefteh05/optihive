import Accordion from "../accordion/accordion";
import { AlertTriangle } from "lucide-react";
function Error() {
  return (
    <Accordion
      variant="alert"
      title="Error"
      className="flex flex-col gap-5 items-center"
    >
      <AlertTriangle size={40} />
      <h4 className="text-2xl font-bold">Something went wrong</h4>
      <p className="text-lg">Please try again later</p>
    </Accordion>
  );
}

export default Error;
