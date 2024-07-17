import User from '#root/models/user.model';
import log from '#root/utils/logger.util';
import response from '#root/utils/response.util';

export function deleteUser(req, res) {
    User.destroy(
        {
            where: {
                email: req.email,
            },
            truncate: true
        }
    ).then(user => {
        log.info(user);
        res.json(response.success("User deleted successfully.", user));
    }).catch(err => {
        log.error(err);
        res.json(response.failure(500, "Something wrong.", err));
    })
}