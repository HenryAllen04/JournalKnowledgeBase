# GitHub Actions Workflow Overview - April 29, 2025

## What is GitHub Actions?

GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform that automates your build, test, and deployment pipeline. It allows you to create workflows that build and test every pull request to your repository or deploy merged pull requests to production.

## Our Current Setup

We've configured a basic CI workflow for the LifeKB project that helps maintain code quality and prepare for future testing.

## When the workflow runs:

- **Every push to main branch**: Whenever code is pushed directly to the main branch
- **Every pull request to main**: When someone creates a PR targeting the main branch
- **Manual trigger**: You can manually run the workflow from the GitHub Actions tab

## What happens in each workflow run:

1. **A new virtual machine starts up**: 
   - GitHub spins up a fresh Ubuntu Linux environment
   - This is a clean slate each time (nothing persists between runs)
   - GitHub handles all infrastructure management

2. **Your code is checked out**: 
   - The `actions/checkout@v3` action downloads your repository code to the VM

3. **Node.js is set up**:
   - Node.js is installed fresh on the VM for each run
   - This is necessary because each workflow runs in a new environment
   - The `actions/setup-node@v3` action handles this installation
   - It also sets up npm caching to speed up dependency installation

4. **Dependencies are installed**:
   - `npm ci` is a clean install that exactly matches your package-lock.json
   - This ensures consistent builds every time

5. **Linting is run**:
   - ESLint checks your code quality
   - If any rules are violated, the workflow will fail

6. **Tests are run** (when you add them):
   - Currently set to not fail the workflow if no tests exist yet
   - Once you add tests, this will validate your code's functionality

## Key benefits of this setup:

1. **Automation**: No manual testing required
2. **Consistency**: Tests run in the same environment every time
3. **Early feedback**: Catch issues before they reach production
4. **Quality control**: Enforce coding standards automatically
5. **Integration validation**: Verify that different parts of your system work together

## Resource usage:

- The setup (VM, Node.js) happens every run because GitHub Actions uses **ephemeral environments**
- This ensures clean, isolated builds but does take a minute or two each time
- This is standard for most CI systems and ensures consistent, reproducible builds
- GitHub provides free minutes for public repositories and a monthly allowance for private ones

## Continuous Integration vs. Continuous Deployment

This specific setup is the **CI** (Continuous Integration) part of CI/CD:
- **Continuous Integration**: Automatically building and testing code changes
- **Continuous Deployment**: (Not yet implemented) Automatically deploying validated changes

## Future Enhancements

As the LifeKB project grows, we can enhance the workflow to:
- Deploy to Expo/App stores
- Run more sophisticated tests
- Set up parallel jobs for speed
- Add notifications for failed builds

## Workflow Location

The workflow is defined in `.github/workflows/ci.yml` 