const db = require("../database/db-config.js");

module.exports = {
	findBy,
	add,
	findById,
	isBookInUserBooks,
	findByUserId,
	findDetailByUserId,
	updateReadingStatus,
	remove
};

function findBy(filter) {
	return db("userBooks").where(filter);
}

async function add(userbook) {
	const [id] = await db("userBooks")
		.insert(userbook)
		.returning("id");
	return findById(id);
}

function findById(id) {
	return db("userBooks").where({ id });
}

function isBookInUserBooks(userId, googleId) {
	return db("userBooks as ub")
		.where({ userId })
		.join("books as b", "ub.bookId", "b.id")
		.where("b.googleId", googleId)
		.select(
			"ub.id",
			"b.googleId",
			"b.title",
			"b.author"
		);

}

function findByUserId(userId) {
	return db("userBooks as ub")
		.where({ userId })
		.join("books as b", "ub.bookId", "b.id")
		.select(
			"ub.id",
			"b.googleId",
			"b.title",
			"b.author",
			"ub.readingStatus",
			"b.categories",
			"b.thumbnail",
			"b.pageCount"
		);
}

function findDetailByUserId(userId, bookId) {
	return db("userBooks as ub")
		.where({ userId })
		.where("ub.id", bookId)
		.join("books as b", "ub.bookId", "b.id")
		.first()
		.select(
			"ub.id",
			"b.googleId",
			"b.isbn10",
			"b.isbn13",
			"ub.readingStatus",
			"b.title",
			"b.author",
			"ub.readingStatus",
			"b.categories",
			"b.thumbnail",
			"b.pageCount",
			"b.publisher",
			"b.publishDate",
			"b.description",
			"b.textSnippet",
			"b.language",
			"b.webRenderLink",
			"b.isEbook"
		);
}

async function updateReadingStatus(userId, bookId, readingStatus) {
	const [id] = await db("userBooks")
		.where({ userId })
		.where("id", bookId)
		.update({ readingStatus })
		.returning("id");
	return findDetailByUserId(userId, id);
}

function remove(userId, bookId) {
	return db("userBooks")
		.where({ userId })
		.where("id", bookId)
		.del();
}