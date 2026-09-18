export interface IAdminUsersStats {
  activeSessions: number;
  bannedUsers: number;
  newUsersDay: number;
  newUsersMonth: number;
  newUsersWeek: number;
  selfSuspendedUsers: number;
  twoFactorUsers: number;
  users: number;
  verifiedUsers: number;
}

export type TApiAdminUsersStats = {
  stats: IAdminUsersStats;
};
