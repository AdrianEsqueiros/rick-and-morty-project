export interface Character {
  info:    Info;
  results: Result[];
}

export interface Location {
  name: string;
  url:  string;
}
export interface Info {
  count: number;
  pages: number;
  next:  string;
  prev:  null;
}

export interface Result {
  id:       number;
  name:     string;
  status:   string;
  species:  string;
  type:     string;
  gender:   string;
  origin:   Location;
  location: Location;
  image:    string;
  episode:  string[];
  url:      string;
  
}



export interface HeadCell {
  disablePadding: boolean;
  id: keyof Result;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";

export interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Result
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}