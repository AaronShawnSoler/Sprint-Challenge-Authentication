
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'aaron', password: '$2a$12$3SePSAyB25nyRXyZhEHtneJDk5L0HLr18JSeZgcLxbLftbplFk/vS'},
        {id: 2, username: 'soler', password: '$2a$12$i1YzJfdpsBOOTtkNjNvLVOS9Fe2vEZ1gJK2gvZVrtO5K8w0nl/Bb2'},
        {id: 3, username: 'shawn', password: '$2a$12$rUHXDGgOgjjjktJoeFDoH.CCTzcc0aFlus0tVd8joMYPpjqI3dgKS'}
      ]);
    });
};
