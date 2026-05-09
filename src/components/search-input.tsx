import * as React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

interface SearchInputProps extends React.ComponentProps<"input"> {
  placeholder?: string;
}

function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        <SearchIcon className="h-4 w-4 text-gray-400" />
      </div>
      <Input className={`ps-10 ${className ?? ""}`} {...props} />
    </div>
  );
}

export { SearchInput };
