const CategoryListSkeleton = ({catLength}: {catLength : number})  => {
  return (
    <ul className="flex flex-col gap-2">
      {Array.from({ length : catLength|| 8  }).map((_, i) => (
        <li key={i}>
          <div className="h-9 mb-5 w-full skeleton"></div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryListSkeleton;
