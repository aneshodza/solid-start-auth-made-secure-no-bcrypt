import sha256 from "crypto-js/sha256";

export const pepper: string = "make_sure_the_pepper_is_long"
                        + "_and_secure_so_that_it_is"
                        + "_hard_to_guess";
let users = [{
  id: 0,
  username: "@aneshodza",
  salt: "qm9616pd3eg",
  digested_password: "a5c594cb0938b5d118f0c4d0e4fbf4a64838c2390da1334a85cef73955008fd1"
}]
export const db = {
  user: {
    async create({ data }) {
      let salt = Math.random().toString(32).slice(2);
      const digestedPassword = sha256(data.password 
                                  + salt
                                  + pepper)
                                    .toString();
      let user = {
        username: data.username,
        id: users.length,
        salt: salt, 
        digested_password: digestedPassword 
      };
      console.log('user:', user);
      users.push(user);
      return user;
    },
    async findUnique({ where: { username = undefined, id = undefined } }) {
      if (id !== undefined) {
        return users.find((user) => user.id === id);
      } else {
        return users.find((user) => user.username === username);
      }
    },
  },
};
