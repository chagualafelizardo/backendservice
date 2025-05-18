import { exec } from "child_process";

const commitMessage = `Auto-commit: felizardo.chaguala@gmail.com ${new Date().toISOString()}`;

// 1. Configurar Git (só precisa ser feito uma vez)
exec('git config --global user.email "felizardo.chaguala@gmail.com"', (error) => {
  if (error) {
    console.error(`❌ Error configuring Git email: ${error.message}`);
    return;
  }

  exec('git config --global user.name "Felizardo Chaguala"', (error) => {
    if (error) {
      console.error(`❌ Error configuring Git name: ${error.message}`);
      return;
    }

    // 2. Processo de commit
    exec("git add .", (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error adding files: ${error.message}`);
        return;
      }

      exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
        if (error) {
          // Tratamento específico para repositório não inicializado
          if (stderr.includes("not a git repository")) {
            console.error("❌ Directory is not a Git repository. Run 'git init' first.");
          } else {
            console.error(`❌ Error committing files: ${error.message}`);
            console.log("Stderr:", stderr);
          }
          return;
        }

        exec("git push origin main", (error, stdout, stderr) => {
          if (error) {
            console.error(`❌ Error pushing to GitHub: ${error.message}`);
            console.log("Stderr:", stderr);
            
            // Sugestão para configurar upstream se necessário
            if (stderr.includes("no upstream branch")) {
              console.log("💡 Try: git push --set-upstream origin main");
            }
            return;
          }
          console.log("✅ Successfully committed and pushed to GitHub!");
          console.log("Commit Message:", commitMessage);
        });
      });
    });
  });
});