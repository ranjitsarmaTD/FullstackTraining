import { AppDataSource } from "../dataSource";
import { User } from "../entity/User";

const userRepo = AppDataSource.getRepository(User);

export const userProfile = async (userId: string) => {
  try {
    const user = await userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err: any) {
    throw new Error(err.message);
  }
};


export const fetchAllEmpService = async ()=>{

  try 
  {
    const users = await userRepo.find({
      select:[
        
        "employeeId",
        "name",
        "email",
        "role",
        "dob",
        "joiningDate",
        "location"]
    })
    return users;
  }catch( Err)
  {
    throw("Error fetching the users")
  };
  ;
  
}

export const deleteEmployee = async(id: string) => {
    const user = await userRepo.findOneBy({ id });

    if (!user) {
      throw new Error("User not found");
    }

    await userRepo.softDelete(user);
    return user;
  }