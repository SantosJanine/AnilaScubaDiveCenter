import prisma from '../lib/prisma.ts';
import bcrypt from 'bcryptjs';

async function hashExistingPasswords() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    if (user.password.length <= 20) {
      const hashed = await bcrypt.hash(user.password, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashed },
      });
      console.log(`Password hashed for user: ${user.email}`);
    }
  }

  console.log('All existing passwords hashed!');
}

hashExistingPasswords()
  .catch(console.error)
  .finally(() => process.exit());
