import { expressApp } from './app';

const PORT = 4000;
export const server = expressApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
