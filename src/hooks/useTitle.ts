import { useEffect } from "react";

const useTitle = (value: string) => {
  useEffect(() => {
    document.title = value;
  }, [value]);
};

export default useTitle;
