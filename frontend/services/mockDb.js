export const getIssues = () => {
  const data = localStorage.getItem('urbanfix_issues');
  return data ? JSON.parse(data) : [];
};

export const saveIssue = (issue) => {
  const issues = getIssues();
  const newIssue = {
    ...issue,
    id: Date.now().toString(),
    status: 'reported',
    timestamp: new Date().toISOString()
  };
  issues.push(newIssue);
  localStorage.setItem('urbanfix_issues', JSON.stringify(issues));
  return newIssue;
};

export const updateIssueStatus = (id, updates) => {
  const issues = getIssues();
  const index = issues.findIndex(p => p.id === id);
  if (index !== -1) {
    issues[index] = { ...issues[index], ...updates };
    localStorage.setItem('urbanfix_issues', JSON.stringify(issues));
    return issues[index];
  }
  return null;
};
