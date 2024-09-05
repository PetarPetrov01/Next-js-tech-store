"use client";
export default function CategoryFilter({
}) {
  return (
    <select
      name="category"
      className="text-new-gray p-1"
    >
      <option value={0} className="text-new-gray">
        Categories
      </option>
      {categories &&
        categories.map((cat) => (
          <option key={cat.id} value={cat.id} className="text-new-gray">
          </option>
        ))}
    </select>
  );
}
