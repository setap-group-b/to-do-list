# Code Glossary

The following is a compendium of our apps current components, this will allow any external contributors to use this as a reference to familiarise themselves with the project's codebase.

> For easy access we recommend using the search field on the left hand side for locating specific directories/ files.

## /lib

This database schema uses the [**Prisma**](https://www.prisma.io/docs) library for its database storage and storage of information streamed to and from the client.

### /lib/db/schema.prisma

### **Database Generation:**

- generator{} and datasource{} are responsible for initialising the client and database respectively, with datasource{} being passed environment variables to declare that the db is a postgresql db and the required URL's for it to host from.

### **Custom Data Type Declarations:**

- Next is our custom data type declarations, the enum 'Status' contains the necessary values to be cycled through later on in our task creation/ edit functions, the enum priority also follows a similar structure and use in our project.

### **Relations:**

- Cross model relations are typically represented by a statement resembling the following:
  > `<ExternalModelName>  <InternalFieldName>? @relation(fields: [<ForeignKeyField>], references: [<ForeignPrimaryKeyField])`
- In this instance the `<ExternalModelName>` and `<ForeignPrimaryKeyField>` are the typical Foreign Table and Foreign Primary Key you would expect to see in a `SQL FOREIGN KEY` declaration.
- One-to-many relations are handled by the `<InternalFieldName>` being superceded by a `[]`, to represent a multitude of values.

### **Model Declarations:**

- **List:** This model contains the relevant items a list would require (id, title, backgroundColour) as well as values useful in relating lists to the users who will be accessing them:

  > userId => The user whom this list 'belongs' to | Todo[] => A listing of all the Todo's nested within this List (This is critical in the loading and saving of a user's lists)

- **Todo:** Like List, this contains the standard fields expected of a Todo List entry (id, title, content), as well as our custom Priority and Status [**enums**](#custom-data-type-declarations).

  - **Some fields unique to Todo are:**

  - > notification => The time before the set deadline that a reminder will be sent out.
  - > deadline => The date in which this task should be completed by.
  - > reminderDate => Stores the calculated value of when the user needs to receive a reminder regarding that particular.
  - > remindedAt => This value is kept null to reset the logic of the reminder status when updating the reminderDate.

  - **Account:**

    - This model mostly contains information used in authentication and the network used in this project.
    - The `userId` in this model maps the relevant `userId` from the `User` model, ensuring account details and information are kept consistent across devices/ connections.

    - **Details used in account authentication:**

      - > type => The type of account used e.g. `"email"` or `"oauth"`
      - > provider => Which service is used to authenticate the user e.g. `"Google"` or `"GitHub`
      - > providerAccountId => The unique identifier given by the service provider is then mapped to this accounts details

    - A number of optional `OAuth` fields are then stored in the event that the chosen provider returns a value for that row (Not all providers distribute the same tokens/ session-data)

      | Row Name           | Data Type         |
      | ------------------ | ----------------- |
      | refresh_token      | (Optional) String |
      | access_token       | (Optional) String |
      | expires_at         | (Optional) Int    |
      | token_type         | (Optional) String |
      | scope              | (Optional) String |
      | id_token           | (Optional) String |
      | session_state      | (Optional) String |
      | oauth_token_secret | (Optional) String |
      | oauth_token        | (Optional) String |

  - **Session:**

    - This model tracks the relevant user's sessionToken, ensuring that session's are maintained properly by utilising the expires field to purge/ validate the affected sessions

  - **User:**

    - This model includes some typical user credentials such as name, email and password.

    - The large bulk of storage within this model is the User's relations to all of the aforementioned tables, these include:

      | Row Name           | Data Type |
      | ------------------ | --------- |
      | Account            | Account[] |
      | Session            | Session[] |
      | todos              | Todo[]    |
      | ownedLists         | List[]    |
      | collaboratingLists | List[]    |

    - For some additional information, createdAt and updatedAt are also mapped to their respective user when any changes are made involving the prisma db.

  - **VerificationToken:**

    - This model greatly aids any functions regarding verification of a user by storing a users identifier and unique token for the session/ until it expires.

    - The unique constraint `@@unique([identifier, token])` also allows for easier querying of this particular model due to the component logic enforcing that `identifier` + `token` must be unique.

---

### lib/auth.js

- **authOptions():** This function is supported by [**NextAuth.js**](https://next-auth.js.org/getting-started/introduction), a subsection of [**Next.js**](https://nextjs.org/docs) which focuses heavily on authenticating and validating data.

  - First, the necessary declarations and default options are adjusted to better work with the program

    - > adapter: => `PrismaAdapter(prisma)` is passed to integrate NextAuth with our [**ORM**](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) of choice (In this case, prisma).
    - > pages: => `/login` this overrides the default page to be loaded by NextAuth with what we want to be loaded
    - > session: => `"jwt"` uses [_JSON Web Tokens_](https://auth0.com/docs/secure/tokens/json-web-tokens) for session management, these are stored client-side and therefore reduce database lookups.
    - > providers: => The array `[GitHubProvider, GoogleProvider, CredentialsProvider]` is passed here, GitHub and Google use their respective `clientId` and `clientSecret` environment variables, while `CredentialsProvider` allows for custom logic to be passed (e.g. typical input of an email and password).

    - **authorize(credentials):**

      - These credentials are then parsed and validated to ensure null/ undefined values arent passed on.
      - The email and password of the user logging in are seperately checked against the prisma database, providing unique errors on fail.
      - If all tests are passed, an object of `{id, name, email, image}` is returned.

      - **callbacks{}:**

        - `jwt({ token, user })` assigns a user's id to a token once they have logged in.

        - `session({ session, token })` Then completes this by assigning the token to a valid session.

    - `secret: process.env.NEXTAUTH_SECRET` then encrypts our session's key by adding a long and randomly generated string to the end of a JWT.

---

### lib/mailer.js

This file is responsible for the sending of the notification reminder for a user's tasks that have a deadline (e.g. "You have 1 week before your deadline!"), it utlises the [**NodeMailer**](https://nodemailer.com/) library to structure and send emails to the desired recipient(s).

- `transporter` is an integral part of NodeMailer that is able to successfully send an email with the values passed to it `{ host, port, secure, auth { user, pass }}`. All values except `secure => (boolean)` are passed from environment variables to these fields.

- **sendReminder(task, list)**

> recipients => maps each entry of the list parameter to that users email, producing a list of endpoints for the email to be sent.
> date => calls dateFormatterformats the deadline date from a Date() value into something more readable for the user (e.g. Wednesday, 14 November 2025 at 13:45:00)

- **transporter.sendMail()**

      * the `.sendMail()` function assigns fields of a passed object typical to that of a normal email:

  > from: =>
  > to: => takes `recipients` and joins each item by `", "` to appropriately chain all email addresses.
  > subject: => Takes the `task.title` and `date` to provide an automated subject field.
  > text: takes various fields from the `task` object and formats it in a welcoming and friendly pre-written message to notify them their task is due in X amount of time.

---

### lib/prisma.js

This file is responsible for establishing the prisma client using the [**prisma library**](https://www.prisma.io/docs)

- checks if the app is running in `"development"` or `"production"` mode, in production, code runs once so calling a new client each instance is safe. However in development, the server typically refreshes after each file change putting strain on the database from numerous redundant connections.

---

### lib/schema.js

This file contains the code responsible for passing formatted credentials to our authentication functions

- **createAuthSchema()**

  - This creates an object to be used in the authorisation for users logging in/ registering
    - Contains fields `{ name, email, password }`, all of these have constraints and default values to enforce valid inputs and maintain consistency in terms of formatting.

---

## node_modules

Here belongs all of the necessary dependencies required for this project installed by running `npm i`, however the length and contents of this directory are subject to change over the course of the app's lifetime.

> For a better explanation of node modules or npm in general, please visit [**the npm site**](https://docs.npmjs.com/about-npm)

---

## /public

This directory holds all images, these have been used for backdrops and placeholders

- Use of the Next.js `Image` component has also been utilised for its increased performance and optimisation [**src/app/page.jsx**](#srcapppagejsx)

---

## /src

### src/app

- ### src/app/(auth)

  - ### src/app/(auth)/login

    - Imports all of the necessary components from [**`"/ui/card.jsx"`**](#srccomponentsuicardjsx) and arranges them to build the login ui of the app.

    - ### src/app/(auth)/signup

      - Almost identical to `"src/app/(auth)/login"` in terms of the imported components, with the only difference being some contextual text differences between logging in and registering.

    ### src/app/(auth)/layout.jsx

    - Checks if a user is already authenticated, redirecting to the dashboard if so.
    - If not, the desired layout is injected into the `"children"` parameter of div `className="flex flex-1 items-center justify-center w-full"`

---

### src/app/actions

### src/app/actions

     ### src/app/actions/group.js

      - `groupSchema` defines a [**zod**](https://zod.dev/?id=table-of-contents) schema for an array of list collaborators, with validation for each entry with the `.refine()` function
      - `createGroup(listId, formState, formData)`: Stores the parsed list of collaborators for use in fetching them by their emails, if successful the prisma schema for that List is updated with the collaborators appended to the list of authors.
      - `deleteGroup(listId)`: Removes all collaborators of a list and redirects out of that (no longer existing) group's url.

    - ### src/app/actions/list.js

      - `todoSchema` defines a zod schema for a list object, containing a title and backgroundColour with relevant input constraints
      - `createList(formState, formData)`: stores a parsed `todoSchema` object to have its fields passed into the prisma `.create({ data: })` object
      - `updateList(listId, formState, formData)`: stores a parsed `todoSchema` object to have its fields passed into a prisma `.update({ where, data })`, with `listId` identifying the list to be updated, and the parsed values overwriting the values of that list.
      - `deleteList(listId)`: If the passed `listId` is found within the prisma schema, `.delete()` is called on that list's ID, with errors being produced if not.

    - ### src/app/actions/todo.js
      - `todoSchema` defines a zod schema for a to-do-list entry, containing a title, content, priority, deadline, notification and status. Each of these fields has the constraints and input requirements established at their declaration with zod's [**primitives**](https://zod.dev/?id=primitives)
      - `createTodo(listId, type, formState, formData)`:
      - `updateTodo(id, listId, type, formState, status)`:
      - `updateTodoStatus(id, listId, type, status)`:

---

 ### src/app/api

   ### src/app/api/auth

     ### src/app/api/auth/[...nextauth]/route.js
      - This file loads the authentication options we previously declared in [**lib/auth**](#libauthjs) for use in our GET and POST requests.
     ### src/app/api/auth/signup/route.js

      - This file handles the signup functionality of our login system, as the fields parsed from our zod schema [**signUpSchema**](#libschemajs) are checked against the database for existing accounts.
      - The parsed password is hashed using [**bcrypt**](https://www.npmjs.com/package/bcrypt) and excluded from the userData object to avoid exposing sensitive information in the response messages

    - ### src/app/api/cron

      - ### src/app/api/cron/route.js
        - [**`checkAndSendReminders()`**](#srclibreminderchecksjs) is used here to gather a list of users who have not yet been reminded about the deadline of their task (based on their `notification` setting) and send out a wave of pre-written reminder emails.

    - ### src/app/api/index.js
      - This file only exports the `src/app/api/[...nextauth]/route` code.

---

 ### src/app/dashboard

   ### src/app/dashboard/group

     ### src/app/dashboard/group/[listId]/todo

      - ### src/app/dashboard/group/[listId]/todo/[id]/edit/page.jsx

        - `PostsEdit({ params })` Updates a user's todo list by pulling the cached list and updating its initialData fields. Cache is used here for greatly increased efficiency and speed when fetching.

        - ### src/app/dashboard/group/[listId]/todo/[id]/add/page.jsx
          - Solely return the TodoForm function component with appropriate default values for its `initialData` parameter: `initialData={{title: "", content: "", priority: "", status: ""}}`
        - ### src/app/dashboard/group/[listId]/todo/page.jsx
          - This file uses the function components [`**Todos**`](#srccomponentstodos), [`**PageHeader**`](#srccomponentspageheaderjsx) and [`**Button**`](#srccomponentsusbuttonjsx) to form the list of group tasks a user is collaborating on.

      - ### src/app/dashboard/group/page.jsx
        - This file uses the [**`PageHeader`**](#srccomponentspageheaderjsx) and [**`Groups`**](#srccomponentsgroupsjsx) function components to form the group page/ dashboard.

    ***

    - ### src/app/dashboard/list

      - ### src/app/dashboard/list/[listId]

        - ### src/app/dashboard/list/[listId]/edit/page.jsx

          - Also uses the `PostsEdit({ params })` function to return a new [**`ListForm`**](#srccomponentslistform) for a created [**`List`**](#srccomponentslist) with updated values passed into the form's `initialData` fields.

        - ### src/app/dashboard/list/[listId]/todo
          - ### src/app/dashboard/list/[listId]/todo/[id]/edit/page.jsx
            - Again, uses `PostsEdit({ params })` to return an updated Todo Form, this time with updated `initialData` field values.
          - ### src/app/dashboard/list/[listId]/todo/add/page.jsx
            - `userTodoAdd({ params })` calls [**`createTodo`**](#srcappactionstodojs) to initialise a valid listId within the database and append the function component [**TodoForm**](#srccomponentstodoform) to that new list.
          - ### src/app/dashboard/list/[listId]/todo/page.jsx
            - `UserList({ params })` uses cache to fetch a user's list and display it using the [**`PageHeader`**](#srccomponentspageheaderjsx), [**`Button`**](#srccomponentsusbuttonjsx), [**`AddCollaborators`**](#srccomponentsaddcollaboratorsjsx), [**`ListDelete`**](#srccomponentslistdelete) and [**`Todos`**](#srccomponentstodos) function components to format the page.

      - ### src/app/dashboard/list/add/page.jsx
      - `UserListAdd()` returns a [**`ListForm`**](#srccomponentslistform) with the [**`createList`**](#srcappactionslistjs) logic being passed as the formAction.

      - ### src/app/dashboard/list/page.jsx
      - `UserLists()` returns a page that fetches and displays all of a users currently created [**`Lists`**](#srccomponentslists), with the option to create a new list by redirecting to [**`/dashboard/list/add`**](#srcappdashboardlistaddpagejsx).

    - ### src/app/dashboard/settings

      - ### src/app/dashboard/settings/index.jsx

        - `SettingsPage({ userData })` declares the structure of the settings page, along with some handlers for customisable features such as the theme, font, boldness, of text.
        - The distinct sections of `Account`, `Theme`, `Font Size` and `Font Boldness` are also defined and composed of function components from the `/components/ui` directory.

      - ### src/app/dashboard/settings/page.jsx
        - `Settings()` is used to validate the user's session, then return the function component `<SettingsPage/>` in a more modularised form to reduce code bloating on our main page hosting multiple function components.

    - ### src/app/dashboard/layout.jsx

      - `AuthLayout({ children })` validates a user's session before returning the logic and layout of the [**`<Sidebar/>`**](#srccomponentssidebar) for use on the display pages of the app.

    - ### src/app/dashboard/page.jsx
      - This file combines all of the html and React components to form our home page, only after that user's session has been validated.

  - ### src/app/globals.css
    - This file provides dynamic theming through the use of [**`oklch()`**](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) and [**`tailwind CSS`**](https://tailwindcss.com/docs/installation/using-vite).
    - This holds some of the presets for global settings like the light and dark-mode feature

- ### src/app/layout.jsx

  - `RootLayout({ children })` declares and initialises some of the variables used in [**`<ThemeProvider/>`**](#srccomponentsuitheme-providerjsx).

- ### src/app/page.jsx
  - `LandingPage()` returns all of the html and embedded React components to create the initial page that is displayed on load, from here a user will either login or signup and enter the protected directories of the app.

---

- ### src/components

  - ### src/components/List/index.jsx

    - `List({ list })` contains the html and React components to display the user's current lists as well as the options to create new lists and append tasks.

  - ### src/components/ListDelete/index.jsx

    - `ListDelete({ listId, className })` packages the functionality of [**deleteList**](#srcappactionslistjs) into a `<ReusableButton/>` function component while preventing the form from being submitted in the standard way.

  - ### src/components/ListForm/index.jsx

    - `ListForm({ formAction, initialData })` contains the html and React components to display the list creation form held at `'/Home/Dashboard/List`.

  - ### src/components/Lists/index.jsx

    - `Lists()` checks for a valid session before pulling the user's currently stored lists from cache for greatly increased speed.
    - The stored lists are then mapped into an array for display in [`'/dashboard/list'`](#srcappdashboardlist)

  - ### src/components/Nav

    - ### src/components/Nav/index.jsx

      - `Nav()` is responsible for the display of the Nav bar commonly seen spanning along the top of the app's pages, It mostly displays a formatted 'current path' in the app's directories.

    - ### src/components/Nav/SettingsDropdown.jsx
      - `SettingsDropdown()` is comprised of mainly React components and displays the dropdown menu when clicking on the user's profile picture.
      - This functions also contains the handlers for the pressable buttons (`Settings` and `Logout`)

  - ### src/components/SessionWrapper/index.jsx

    - This files singular purpose is to initialise NextAuth's [**`SessionProvider`**](https://next-auth.js.org/getting-started/client#sessionprovider) and store this result in a variable to be used across the app (`SessionWrapper`).

  - ### src/components/Sidebar

    - ### src/components/Sidebar/Groups.jsx

      - `Groups()` pulls the available groups in a user's session from cache, then passes them to the [**`<GroupsList/>`**](#srccomponentssidebargroupslistjsx) component for rendering on its respective page

    - ### src/components/Sidebar/GroupsList.jsx

      - `Group({ state, group })` contains the html and logic to display the currently available group lists the user has access to.
      - `GroupsList({ groups })` forms the structure of this panel on the sidebar, mapping the number of available `<Group/>` items as children to its structure.

    - ### src/components/Sidebar/index.jsx

      - `index()` contains the React components that display the `🏠 Home` button that redirects the user to `'/dashboard/`
      - this function also pulls the user's current lists from cache to be displayed in the space below the `home` button.

    - ### src/components/Sidebar/SortableListItem.jsx

      - `SortableListItem({ list, state })` One of the sortable lists in the sidebar.

    - ### src/components/Sidebar/Lists.jsx

      - `SortableListItem({ list, state })` Allows for drag and drop styling with the list items displayed on the sidebar using the React toolkit [**`dnd kit`**](https://docs.dndkit.com/api-documentation/context-provider).
      - `Lists({ userLists })` contains the display logic for the lists held in the sidebar as well as the wider options of creating new lists or viewing all lists.
        - This function also stores `<SortableListItem/>` as a child node of Lists structure, utilising localStorage to help the custom order of lists persist across sessions.

    ### src/components/Sidebar/Sidebar.jsx

      - `Sidebar({ children })` acts as a unifying function to act as a wrapper for the various subcomponents the sidebar is comprised of.
      - This is visible in [`'/src/components/Sidebar`](#srccomponentssidebar)

    ### src/components/TestButton/index.jsx

      - Simply returns a button used for testing

    - ### src/components/Todo/index.jsx

      - `Todo({ type, listId, task })` contains the html and React components to render a single Todo item on the `'Home/Dashboard/List/Todo'` page.
      - The `'Accordion'` descriptors represent the components ability to 'extend' and show its content [**read more here...**](https://react-bootstrap.netlify.app/docs/components/accordion/).

    - ### src/components/TodoForm/index.jsx

      - `TodoForm({ formAction, initialData, listId, listType })` contains the html and React components for rendering a form capable of establishing a new task for a todo list
      - Each field has the necessary error handling and input validators to limit issues when submitting using the built in handlers

    - ### src/components/Todos/index.jsx

      - `Todos({ type = "list", listId })` pulls the user's current todo lists and maps them to the appropriate fields of the `<Accordion/>` component (e.g. assigning title to the accordion's head and the content to its initially hidden section).

    - ### src/components/ui
      -
      - ### src/components/ui/button.jsx
      - `Button({ className, variant, size, asChild, ...props })` is a reusable UI component for rendering buttons across the app.The asChild prop allows rendering custom elements (like a, Link, etc.) instead of a standard button, using Radix UI's Slot.Includes built-in accessibility and focus styles using focus-visible, aria-invalid, and disabled states.
      - ### src/components/ui/card.jsx
      - `Card({ className, ...props })` renders the main card wrapper with base padding, border, and shadow styles. Accepts additional props and custom class names.Child components like CardHeader, CardTitle, CardDescription, CardContent, and CardFooter are used to structure content clearly.
      - Supports customization via the className prop for each section.
      - ### src/components/ui/theme-provider.jsx
      - > This is an incomplete component directory, files that need linking to will be added ahead of the main bulk of content
    - ### src/components/AddCollaborators.jsx
    - `AddCollaborators({ listId, user, listCollaborators })` is a modal component that allows users to manage collaborators for a specific to-do list. Built with the Dialog component from @/components/ui/dialog to open a modal when clicking the Add collaborators button.
    - Uses useState to track the current list of collaborators and useActionState to handle async form submissions using the createGroup server action
    - The ReusableMultiTextInput component is used to add multiple collaborators via email, with built-in validation and change tracking.
    - A hidden <input> field serializes the collaborators (excluding the current user) for form submission.
    - Displays form validation errors if any are returned from the createGroup action.
    - Includes a red "Remove all collaborators" link that calls the deleteGroup server action to clear the list.
    - ### src/components/Groups.jsx
    - `Groups()` is an asynchronous server component that fetches and displays the user's current groups.Uses `getServerSessionWrapper()` to determine if a user is logged in. If not, it displays a sign-in prompt.Uses `getUserGroups()` wrapped in a cached function ("use cache") to retrieve the authenticated user's groups from the database or backend.
    - If no groups exist, it encourages the user to create one.
    - If groups are found, they are displayed in a responsive grid layout, each rendered with the Group component.
    - ### src/components/PageHeader.jsx
    - `PageHeader({ title })` renders a simple, reusable page header with a back navigation button and a dynamic title.Uses the `useRouter()` hook from Next.js to enable backward navigation via `router.back()`.Displays a left-pointing arrow icon (LucideArrowLeft) that functions as a back button. Accepts a title prop which is rendered next to the icon, automatically capitalized.Used to give context and navigation

---

- ### src/hooks
- ### src/hooks/use-mobile.js
- `useIsMobile()` is a React hook that detects whether the current viewport width is considered mobile size.Defines a mobile breakpoint constant at 768 pixels.
- `window.matchMedia` to listen for viewport width changes below the breakpoint.
- Sets and returns a boolean state isMobile indicating if the screen width is less than the mobile breakpoint.

---

- ### src/lib
  - ### src/lib/reminderChecks.js
  - `checkAndSendReminders()` is an asynchronous server-side function responsible for sending reminder notifications for todo tasks scheduled for the current day. Defines the start and end of the current day to filter reminders due today.
  - Queries the database with `reminderDate` between the start and end of today. Status of either "PENDING" or "IN_PROGRESS". `remindedAt` unset (i.e., reminders not already sent).
  - Includes related List with its collaborators and the assigned User
  - Sends reminders via the `sendReminder` function to both the task owner and all collaborators. Marks each todo’s `remindedAt` timestamp after successfully sending the reminder to prevent duplicate notifications.
  - ### src/lib/utils.js

---

- ### src/utils
- ### src/utils/constants.js
- localStorageFont, localStorageBoldness is used for persistant user font and boldness preferences in localStorage.
- `status` represent which state the task is in (pending, in progress or completed)
- `status icon`. icon next to the status of the tasks
- `priority` levels used for each task (HIGH,MEDIUM,LOW,NONE)
- `priorityObject` is a readable map for priority values.
- ### src/utils/cyclePriority.js
- Cycles through the predefined list of priorities (e.g., HIGH, MEDIUM, LOW, NONE) and sets the next one in the list. When it reaches the end, it loops back to the start.
- `currentPriority`: The current priority object (e.g., { value: "MEDIUM" }).
- `priorities`: Array of priority objects to cycle through (e.g., `[{ value: "HIGH" }, { value: "MEDIUM" }, ...]`).
- `setPriority`: A setter function to update the selected priority.
- In practice this is will work such that If `currentPriority` is "LOW", and the priorities list is [HIGH, MEDIUM, LOW, NONE], it will cycle to "NONE" next. From "NONE", it will cycle back to "HIGH".
- ### src/utils/displayError.js
- To show a user-friendly error notification using `react-hot-toast` based on different possible error formats.
- `err`: Can be a string, object, or server response containing an error message. If `err` is a string, it directly displays it as a toast error.
- If `err.data.message` is an array, it loops through the array and displays each message.
- a default error message: "Something went wrong, please try again!".
- ### src/utils/functions.js
- `randomColor(isLightMode: boolean): string` Generates a random color based on the theme mode. In light mode, generates darker shades (0–99). In dark mode, generates lighter shades (150–255).
- `dateFormatter(date: string | Date, options?: Intl.DateTimeFormatOptions): string`. Formats a given date into a readable string using British English locale `(en-GB)`. `date`: A Date object or date string. `options`: `Optional Intl.DateTimeFormatOptions` to customize formatting.(e.g., "Thursday, 15 May 2025 at 12:34:56").
- `capitalizeString(value: string): string`. Returns the string with its first character in uppercase. capitalizeString("hello");  // "Hello"
- `modifyOptions(arr: string[], label?: string): { label: string, value: string }[]`. Transforms an array of strings into an array of objects for use in dropdowns or selects. Returns: Array of `{ label, value }` pairs. For example, `modifyOptions(["low", "medium"]);`
- `getNotificationDate(deadlineDate: Date | string, option: string): Date | null`. Calculates a notification date relative to a given deadline. Returns: A Date object representing the notification time, or null if invalid. Subtracts time from the deadline based on the option. If the calculated date is in the past, returns today’s date instead. eg. `getNotificationDate("2025-06-01", "1 week");`
- ### src/utils/gatAllTasks.js
- `getAllTasks(user, isCompleted)` fetches all tasks associated with a given user — including tasks from their own lists and any shared (collaborative) lists.
- `Promise<Todo[]>:` An array of tasks (todos) accessible by the user, as returned from Prisma’s `findMany()` query. Queries the `todo` table for tasks where the user is the owner of the list `(List.userId)`. Or the user is a collaborator on the list `(List.collaborators)`.
- The `isCompleted` parameter is not currently used in the query. You may filter tasks like this in the future where you can get completed tasks or not etc. 
- ### src/utils/getServerSessionWrapper.js
- A helper function that wraps NextAuth’s `getServerSession()` with pre-configured authentication options. This function simplifies server-side access to the current user session by using your authOptions configuration. It's useful in server components, API routes, or any place where server-side authentication is required.
- `Promise<Session | null>` Resolves to the authenticated user's session object, or null if the user is not logged in.
- ### src/utils/getUserGroup.js
- `getUserGroup(user, listId)` function checks whether the user is a collaborator on a given list (or group). It ensures that only authorized users can access the list's data. It uses Prisma’s `findUnique` method on the list model with a condition that checks both the id of the list and whether the user is listed as a collaborator.
- `user: { id: string }` is the user object (or just an object with the user's ID)
- `listId: string` is the unique identifier of the list/group to look up.
- `Promise<List | null>` resolves to the list if the user is a collaborator, otherwise null.
- ### src/utils/getUserGroups.js
- ### src/utils/getUserList.js
- ### src/utils/getUserLists.js
- ### src/utils/getUserToDo.js
- ### src/utils/getUserToDos.js
- ### src/utils/index.js

---

#### _To be continued..._
