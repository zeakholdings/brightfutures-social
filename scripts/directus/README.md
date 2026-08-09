# Directus roles

The setup command configures anonymous, filtered read access only. Contact and idea collections have no anonymous permissions; the website writes to them with `DIRECTUS_SERVER_TOKEN` on the server.

In Directus, keep Administrator on the built-in administrator policy. Create a Committee Editor policy with CRUD access to events, committee, resources, site settings, contact messages and ideas, but exclude `ideas.internal_notes` unless trusted. Create an Author policy with CRUD access to posts only, and restrict publishing fields (`status`, `published_at`) if articles require committee approval.

Review these policy assignments in each environment because user and policy IDs are deployment-specific and should not be guessed by a migration.
