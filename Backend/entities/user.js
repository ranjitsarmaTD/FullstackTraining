import { EntitySchema } from "typeorm";


const User = new EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        email: {
            type: "varchar"
        },
        password:{
            type: "varchar"
        },
        dept: {
            type: "varchar"
        },
        salary: {
            type: "decimal",
            precision: 10,
            scale: 2
        },
        role: {
            type: "enum",
            enum: ["admin", "employee"],
            default: "employee"
        },
        disabled: {
            type: "boolean",
            default: false
        }
    }

});

export default User;