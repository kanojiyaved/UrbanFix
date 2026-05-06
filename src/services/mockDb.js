export const getPotholes = () => {
  const data = localStorage.getItem('urbanfix_potholes');
  return data ? JSON.parse(data) : [];
};

export const savePothole = (pothole) => {
  const potholes = getPotholes();
  const newPothole = {
    ...pothole,
    id: Date.now().toString(),
    status: 'reported',
    timestamp: new Date().toISOString()
  };
  potholes.push(newPothole);
  localStorage.setItem('urbanfix_potholes', JSON.stringify(potholes));
  return newPothole;
};

export const updatePotholeStatus = (id, updates) => {
  const potholes = getPotholes();
  const index = potholes.findIndex(p => p.id === id);
  if (index !== -1) {
    potholes[index] = { ...potholes[index], ...updates };
    localStorage.setItem('urbanfix_potholes', JSON.stringify(potholes));
    return potholes[index];
  }
  return null;
};
