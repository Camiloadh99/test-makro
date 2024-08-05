<p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzRWLu3LC-9X0kd_xJtWZjhCp-l0dVLyJVXA&s" width="200" alt="Express logo" />
</p>

# Backend Node.js boilerplate

This is the structure for a backend service using Node.js. It was created following the clean architecture.

### Clean architecture

To see more information, click this <a href=https://betterprogramming.pub/the-clean-architecture-beginners-guide-e4b7058c1165>link.</a>

<p align="center">
  <img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" />
</p>

### Project structure

```
app
 └ src                                      → Application sources
    └ application                           → Application services layer
       └ use_cases                          → Application business rules
          └ module_A
          └ module_B
    └ domain                                → Enterprise core business layer such as domain model objects (Aggregates, Entities, Value Objects) and repository interfaces
      └ entities                            → DOM
      └ mappers
      └ repositories
    └ infrastructure                        → Frameworks, drivers and tools such as Database, the Web Framework, mailing/logging/glue code etc.
      └ libs                                → Libraries/Frameworks
      └ storage
        └ database (Ej: postgres)
          └ models
          └ repositories                    → Implementation of domain repository interfaces
      └ web
        └ routes
    └ interfaces
      └ controllers
  └ node_modules (generated)                → NPM dependencies
  └ test                                    → Source folder for unit or functional tests
  └ index.ts
```
