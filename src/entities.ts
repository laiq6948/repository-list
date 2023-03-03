export interface ResponseData {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export interface Repository {
  id: number;
  name: string;
  url: string;
  private: boolean;
  created_at: string;
  // Actually there are various of properties for Repository Object, for simplicity we only use 5 of them.
}
