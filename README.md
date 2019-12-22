> :warning: Requires node >= 10

# make-index

This is a command line tool which generates an index.js esm (import/export) file from the filenames within the folder.

1. Install `npm i -g @toolia/make-index`

2. Navigate to the folder you want to use the command on `cd path/to/directory`

3. Run the command `make-index`

# Todos

- Make it possible to make 'require' modules instead of just esm import/export modules.

- Write tests and increase code quality.

- Allow recursive version and generally expand functionality where relevant.

- Make option to export other files such as `.jsx`.
