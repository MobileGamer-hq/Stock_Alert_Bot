const commands = [
    {
        command: 'start',
        description: 'Start your journey with stock alerts',
    },
    {
        command: 'help',
        description: 'Learn what this bot does and how to use it',
    },
    {
        command: 'about',
        description: 'Get to know your Stock Alert Assistant',
    },
    {
        command: 'commands',
        description: 'View all available commands',
    },
    {
        command: 'alerts',
        description: 'Get your latest stock alerts',
    },
];

const adminCommands = [
    {
        command: 'send_message',
        description: 'Send a message to all users',
    },
    {
        command: 'send_video',
        description: 'Send a video to all users',
    },
    {
        command: 'send_alert',
        description: 'Send a stock alert to all users',
    },
    {
        command: 'users',
        description: 'View the number of registered users',
    },
    {
        command: 'list_users',
        description: 'List all registered users',
    },
    {
        command: 'add_admin <id>',
        description: 'Add a user as an admin',
    },
    {
        command: 'remove_admin <id>',
        description: 'Remove a user from admin status',
    },
    {
        command: 'list_admins',
        description: 'List all admins',
    },
    ...commands,  // Include regular commands for admins as well
];

module.exports = {
    commands,
    adminCommands,
};
