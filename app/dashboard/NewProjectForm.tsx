import { addProject } from "./actions";

// ... inside the return
<form action={addProject} className="mb-8 space-y-2">
  <input
    name="name"
    placeholder="Project name"
    className="border p-2 rounded block w-full"
    required
  />
  <input
    name="cost"
    type="number"
    placeholder="Cost"
    className="border p-2 rounded block w-full"
    required
  />
  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
    Add Project
  </button>
</form>