const pool = require('../config/database');

exports.updateAccount = async (user_id, data) => {
	const keys = Object.keys(data);
	const info = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
	const values = keys.map((key) => data[key]);
	const res = await pool.query(
		`UPDATE users
		SET ${info}
		WHERE user_id = $${keys.length + 1}`,
		[...values, user_id]
	);

	return res.rowCount;
};

exports.updateTime = async (user_id, time) => {
	const result = await pool.query(
		`UPDATE users SET last_seen = to_timestamp($1) WHERE user_id = $2`,
		[time / 1000, user_id]
	);

	return result.rowCount;
};
