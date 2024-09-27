// src/utils/storage.js

export const loadData = () => {
  const data = localStorage.getItem('chartData');
  return data ? JSON.parse(data) : {};
};

export const saveData = (data) => {
  localStorage.setItem('chartData', JSON.stringify(data));
};
