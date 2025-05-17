
import { NewItemForm } from "@/components/items/NewItemForm";

const NewItem = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Report an Item</h1>
        <p className="text-muted-foreground">
          Report a lost or found item on campus
        </p>
      </div>
      
      <NewItemForm />
    </div>
  );
};

export default NewItem;
