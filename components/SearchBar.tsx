// const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => (
//     <input
//       type="text"
//       placeholder="Search videos..."
//       onChange={(e) => onSearch(e.target.value)}
//       className="p-2 border rounded lg:w-1/2 z-10 sticky"
//     />
//   );
  
//   export default SearchBar;
const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => (
  <input
    type="text"
    placeholder="Search videos..."
    onChange={(e) => onSearch(e.target.value)}
    className="p-2 border rounded lg:w-1/2 z-10 sticky"
    aria-label="Search for videos by title or genre"
  />
);

export default SearchBar;
