import { AppDataSource } from "../dataSource";
import { Salary } from "../entity/Salary";
import { User } from "../entity/User";

const salaryRepo = AppDataSource.getRepository(Salary);
const userRepo = AppDataSource.getRepository(User);

export const getMySalaryService = async (userId: string) => {
  const salary = await salaryRepo.findOne({
    where: { user: { id: userId } },
    relations: ["user"],
    order: { createdAt: "DESC" }, // latest salary
  });

  if (!salary) {
    throw new Error("No salary found for user");
  }

  return {
    salaryId: salary.salaryId,
    baseSalary:salary.baseSalary,
    bonus:salary.bonus,
    deductions: salary.deductions,
    netSalary: salary.netSalary,
    month: salary.month,
    year: salary.year,
  };
};

export const addSalaryService = async (
  employeeId: string,
  baseSalary: number,
  bonus: number,
  deductions: number,
  month: string,
  year: number,
) => {
  const user = await userRepo.findOne({
    where: { employeeId },
  });

  if (!user) {
    throw new Error("Employee not found");
  }

  try {
    const netSalary = baseSalary + bonus - deductions;

    const salary = salaryRepo.create({
      baseSalary,
      bonus,
      deductions,
      netSalary,
      month,
      year,
      user: { id: user.id },
    });

    return await salaryRepo.save(salary);
  } catch (err) {
    console.log(err);
    throw "Salary was unable to be created.";
  }
};

export const getAllSalariesService = async () => {
  const salaries = await salaryRepo.find({
    relations: ["user"],
    order: { createdAt: "DESC" },
  });

  const latestMap = new Map<string, any>();

  for (const sal of salaries) {
    const userId = sal.user.id;

    if (!latestMap.has(userId)) {
      latestMap.set(userId, {
        salaryId: sal.salaryId,
        employeeId: sal.user.employeeId,
        name: sal.user.name,
        role: sal.user.role,
        netSalary: sal.netSalary,
        month: sal.month,
        year: sal.year
      });
    }
  }

  return Array.from(latestMap.values());
};
