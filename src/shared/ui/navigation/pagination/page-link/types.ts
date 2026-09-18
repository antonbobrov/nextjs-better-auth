export interface IProps {
  isActive: boolean;
  onPageChange: (page: number) => void;
  page: number;
}
