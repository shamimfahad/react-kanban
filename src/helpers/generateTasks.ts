import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

/**
 * Generate random tasks
 * @param  {number} length
 */
export const generateTasks = (length: number) => {
  return Array.from(Array(length)).map((task, index) => {
    return {
      id: uuid(),
      title: faker.lorem.sentence(),
      positionInColumn: index,
    };
  });
};
