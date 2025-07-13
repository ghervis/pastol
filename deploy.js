import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import simpleGit from 'simple-git';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, '.');
const targetDir = path.resolve(__dirname, '../pastol-private');

const git = simpleGit(targetDir);

async function deploy() {
  try {
    // Copy files
    await fs.copy(sourceDir, targetDir, {
      filter: (src, dest) => {
        // Exclude node_modules and other unnecessary files
        return !src.includes('node_modules') && !src.includes('.git');
      }
    });
    console.log('Files copied successfully!');

    // Initialize git if not already initialized
    if (!(await git.checkIsRepo())) {
      await git.init();
      console.log('Initialized a new git repository.');
    }

    // Add all changes
    await git.add('.');
    console.log('Added changes to git.');

    // Commit changes
    await git.commit('Automated deployment commit');
    console.log('Committed changes.');

    // Push changes
    await git.push('origin', 'main');
    console.log('Pushed changes to remote repository.');
  } catch (err) {
    console.error('Error during deployment:', err);
  }
}

deploy();