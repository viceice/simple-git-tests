import Git from "simple-git";
import fs from "fs-extra";

const base = "./git-test";

(async () => {
  await fs.remove(base);
  await fs.ensureDir(base);
  const repo = Git(base).silent(false);
  await repo.init();
  await repo.addConfig("user.email", "Jest@example.com");
  await repo.addConfig("user.name", "Jest");
  await fs.writeFile(base + "/past_file", "past");
  await repo.add(["past_file"]);
  await repo.commit("past message");

  await repo.checkoutBranch("test", "master");

  const branch = await repo.branch();
  console.assert(branch.current === "test", `Error: '${branch.current}' <> 'test'`);

  console.log("works");
})().catch(console.error);
