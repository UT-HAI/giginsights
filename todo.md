# TODO

There are some aspects of this project that are incomplete, since many of the
features were just prototyped. As I transition and pass this website on, I
think it will be useful for people who work on this codebase in the future to
be able to reference this document so they know what features are missing

### Account Transition (**URGENT**)

- [X] Transition Website deployment from Vercel to Heroku
- [ ] Transition PostgresSQL from personal account (currently using personal Vercel instance)
- [ ] Transition BlobStorage from personal account (currently using personal Vercel instance)
- [ ] Transition OAuth from personal account (currently using personal GCloud instance)

Note, I will be shutting down my personal accounts, since they are, well, personal accounts

### Code Hygeine
- [ ] Fix a lot of any types and ts ignore comments (sorry I was really in a rush to finish)
- [ ] Add CI/CD for pushing to production

### Authentication

- [ ] Add forgot password/reset functionality

### Profile and Information

- [ ] Add data processing for info page (Currently frontend does not submit anything)
- [ ] Create SQL tables for info

### Calendar

- [ ] Add error handling for bad files
- [ ] Server or client side caching

### Maps

- [ ] Add functionality to upload files
- [ ] Add error handling for bad files
- [ ] Cache and process files more efficiently (Maybe add a preprocessing step?)
- [ ] Make times to local timezone instead of UTC time
- [ ] Add functionality so that the lifetime trip data is also parsed concurrently
