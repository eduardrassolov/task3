# Task3
To start localy:
1. Download repository.
2. Open terminal CD to root folder of project.
3. `npm install` - will install all needed packages.
4. `npm run dev` - will run project.

Server will host on http://localhost:3000

### `List of endpoints`

|Type query|Endpoint|Action|
|----------|--------|------|
|/GET|/notes|return all notes|
|/GET|/notes?filter=all|return all notes|
|/GET|/notes?filter=active|return all active notes|
|/GET|/notes?filter=archived|return all archived notes|
|/GET|/notes/stats|return statistic of active and archived notes by each category|
|/POST|/notes|create new note|
|/DELETE|/notes/:id|delete note by ID|
|/DELETE|/notes|delete all notes|
|/PATCH|/notes/:id|update note by id (you can edit only `name`, `content`, `category`)|
|/PATCH|/notes/:id/archive|update note by id to `archived`|
|/PATCH|/notes/:id/active|update note by id to `active`|



