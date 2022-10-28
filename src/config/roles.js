const collaborator = ['getUsers', 'getPlans', 'getInvestments', 'getTransactions']
const moderator = [...collaborator, 'managePlans']
const admin = [...collaborator, ...moderator, 'manageUsers', 'manageInvestments']


const allRoles = {
  user: [],
  collaborator: collaborator,
  moderator: moderator,
  admin: admin
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
