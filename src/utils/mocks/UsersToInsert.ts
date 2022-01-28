

class usersToInsert {
    get() {

        const users = [
            {
                email: "userTest1@mail.com",
                value: 20.3
            },
            {
                email: "userTest2@mail.com",
                value: 30.6
            },
            {
                email: "userTest1@mail.com",
                value: 22.8
            },
            {
                email: "userTest3@mail.com",
                value: 18.1
            },
            {
                email: "userTest4@mail.com",
                value: 29
            }
        ]

        return users

    }
}

module.exports = usersToInsert