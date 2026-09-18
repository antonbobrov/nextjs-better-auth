export interface IProps {
  onPageChange: (page: number) => void;
  page: number;
  pageSize: number;
  total: number;
}

export type TPageItem = number | 'ellipsis-start' | 'ellipsis-end';
