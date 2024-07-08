import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  // func executedbefore every single test
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (error) {}
});
