export const sequelizeConfigProps = {
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
        options: {
            trustedConnection: true,
        },
    },
};