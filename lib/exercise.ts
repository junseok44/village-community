// try {
//   console.log(req.body);
//   let { title, body } = req.body;

//   const userData: { username: string; id: string } = await getDataFromCookie(
//     req,
//     res,
//     "user"
//   );
//   const user = await findUser(userData.username);
//   if (!user) {
//     throw new Error("no user");
//   }
// } catch (error) {
//   res.send("error occured");
// }
