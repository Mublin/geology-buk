// seeds/seed_users.js

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          { id: 1, reg_number: 'EES/17/GEL/00024', email: null, name: 'Mufida Muhammad Kamil', student: true, admin: false },
          { id: 2, reg_number: 'EES/17/GEL/00049', email: null, name: 'Sanda Abubakar Lawan', student: true, admin: false },
          { id: 4, reg_number: 'EES/18/GEL/00103', email: null, name: 'Abdulbasid Abubakar', student: true, admin: false },
          { id: 5, reg_number: 'EES/18/GEL/00104', email: null, name: 'Aminah Umar Abubakar', student: true, admin: false },
          { id: 6, reg_number: 'EES/18/GEL/00107', email: null, name: 'Sumayya Hussaini Abubakar', student: true, admin: false },
          { id: 7, reg_number: 'EES/18/GEL/00108', email: null, name: 'Umar Abubakar', student: true, admin: false },
          { id: 8, reg_number: 'EES/18/GEL/00110', email: null, name: 'Khalil Ibrahim Ado', student: true, admin: false },
          { id: 9, reg_number: 'EES/18/GEL/00112', email: null, name: 'Faruk Ibrahim Aliyu', student: true, admin: false },
          { id: 11, reg_number: 'EES/18/GEL/00116', email: null, name: 'Simon Odira Chidobi', student: true, admin: false },
          { id: 12, reg_number: 'EES/18/GEL/00117', email: null, name: 'Abdulbasit Olaitan Ewetola', student: true, admin: false },
          { id: 13, reg_number: 'EES/18/GEL/00119', email: null, name: 'Raymond Francis', student: true, admin: false },
          { id: 14, reg_number: 'EES/18/GEL/00126', email: null, name: 'Nasiru Ibrahim', student: true, admin: false },
          { id: 15, reg_number: 'EES/18/GEL/00127', email: null, name: 'Adams Ojochegbe Idachaba', student: true, admin: false },
          { id: 16, reg_number: 'EES/18/GEL/00128', email: null, name: 'Sunusi Chindo Imam', student: true, admin: false },
          { id: 17, reg_number: 'EES/18/GEL/00129', email: null, name: 'Sani Kabir Inuwa', student: true, admin: false },
          { id: 18, reg_number: 'EES/18/GEL/00130', email: null, name: 'Isah Nasir Isah', student: true, admin: false },
          { id: 19, reg_number: 'EES/18/GEL/00131', email: null, name: 'Abdullahi Idah Lawal', student: true, admin: false },
          { id: 20, reg_number: 'EES/18/GEL/00132', email: null, name: 'Hussain Muhammad Maikudi', student: true, admin: false },
          { id: 21, reg_number: 'EES/18/GEL/00134', email: null, name: 'Mukhtar Ogirima Muhammad', student: true, admin: false },
          { id: 22, reg_number: 'EES/18/GEL/00135', email: null, name: 'Abubakar Ciroma Musa', student: true, admin: false },
          { id: 23, reg_number: 'EES/18/GEL/00137', email: null, name: 'Muhammad Shanono Mustapha', student: true, admin: false },
          { id: 24, reg_number: 'EES/18/GEL/00138', email: null, name: 'Mustapha Abubakar Oniyangi', student: true, admin: false },
          { id: 25, reg_number: 'EES/18/GEL/00140', email: null, name: 'Habiba Safianu Rabiu', student: true, admin: false },
          { id: 26, reg_number: 'EES/18/GEL/00141', email: null, name: 'Muhammad Hussain Rabiu', student: true, admin: false },
          { id: 27, reg_number: 'EES/18/GEL/00142', email: null, name: 'Haruna Haruna Saleh', student: true, admin: false },
          { id: 28, reg_number: 'EES/18/GEL/00143', email: null, name: 'Asma`u Musa Saminu', student: true, admin: false },
          { id: 29, reg_number: 'EES/18/GEL/00144', email: null, name: 'Amina Muhammad Sani', student: true, admin: false },
          { id: 30, reg_number: 'EES/18/GEL/00145', email: null, name: 'Sabiu Sani', student: true, admin: false },
          { id: 31, reg_number: 'EES/18/GEL/00146', email: null, name: 'Hamid Adeiza Sanni', student: true, admin: false },
          { id: 32, reg_number: 'EES/18/GEL/00147', email: null, name: 'Abubakar Sadiq Sulaiman', student: true, admin: false },
          { id: 33, reg_number: 'EES/18/GEL/00148', email: null, name: 'Sulaiman Yakubu Sulaiman', student: true, admin: false },
          { id: 34, reg_number: 'EES/18/GEL/00149', email: null, name: 'Mansur Suleman', student: true, admin: false },
          { id: 35, reg_number: 'EES/18/GEL/00151', email: null, name: 'Salisu Abubakar Umar', student: true, admin: false },
          { id: 36, reg_number: 'EES/18/GEL/00154', email: null, name: 'Abubakar Abubakar Yunus', student: true, admin: false },
          { id: 37, reg_number: 'EES/18/GEL/00155', email: null, name: 'Muhammad Abdullahi Yunusa', student: true, admin: false },
          { id: 38, reg_number: 'EES/18/GEL/00156', email: null, name: 'Hassana Umar Bala', student: true, admin: false },
          { id: 41, reg_number: 'EES/18/GEL/00160', email: null, name: 'Karima Garba Yakubu', student: true, admin: false },
          { id: 42, reg_number: 'EES/18/GEL/00162', email: null, name: 'Aisha Yaro Balarabe', student: true, admin: false },
          { id: 43, reg_number: 'EES/18/GEL/00163', email: null, name: 'Abdulmumin Naula', student: true, admin: false },
          { id: 44, reg_number: 'EES/18/GEL/00164', email: null, name: 'Abdulkadir Danladi Idris', student: true, admin: false },
          { id: 45, reg_number: 'EES/18/GEL/00166', email: null, name: 'HISHAM MUHAMMAD HASSAN', student: true, admin: false },
          { id: 46, reg_number: 'EES/18/GEL/00167', email: null, name: 'MUHAMMAD ALHASSAN DAHIRU', student: true, admin: false },
          { id: 47, reg_number: 'EES/18/GEL/00168', email: null, name: 'MUHAMMAD NASAYE GARBA', student: true, admin: false },
          { id: 48, reg_number: 'EES/18/GEL/00169', email: null, name: 'RABIATU HARUNA', student: true, admin: false },
          { id: 49, reg_number: 'EES/18/GEL/00170', email: null, name: 'HADI DANDAWAKI YAKUBU', student: true, admin: false },
          { id: 50, reg_number: 'EES/18/GEL/00171', email: null, name: 'Kasim Shuaib', student: true, admin: false },
          { id: 51, reg_number: 'EES/18/GEL/00172', email: null, name: 'Maryann Ogechukwu Chima', student: true, admin: false },
          { id: 52, reg_number: 'EES/18/GEL/00173', email: null, name: 'Shehu Isyaku', student: true, admin: false },
          { id: 53, reg_number: 'EES/18/GEL/00174', email: null, name: 'Abubakar Abdurrasheed Tukur', student: true, admin: false },
          { id: 54, reg_number: 'EES/18/GEL/00175', email: null, name: 'AUWAL HASHIM BALA', student: true, admin: false },
          { id: 55, reg_number: 'EES/18/GEL/00178', email: null, name: "YA'QUB ISMA'IL IBRAHIM", student: true, admin: false },
          { id: 56, reg_number: 'EES/19/GEL/00321', email: null, name: 'Sani Abdulkadir Ahmad', student: true, admin: false },
          { id: 57, reg_number: 'EES/19/GEL/00322', email: null, name: 'Abdullahi Lawal', student: true, admin: false },
          { id: 40, reg_number: 'EES/18/GEL/00158', email: 'mublin99@gmail.com', name: 'Mubarak Muhammad', student: true, admin: true },
          { id: 10, reg_number: 'EES/18/GEL/00115', email: null, name: 'Alamin Gwaram Balarabe', student: true, admin: false },
          { id: 3, reg_number: 'EES/18/GEL/00102', email: null, name: 'Abubakar Mustapha Abdullahi', student: true, admin: false },
          { id: 39, reg_number: 'EES/18/GEL/00157', email: null, name: 'Muhammad Ishaq Ameen', student: true, admin: false },
          ]);
          }).then(function () {
            // Inserts seed entries for hash
            return knex('hash').insert([
                { reg_number: 'EES/18/GEL/00158', sirri: '2222' },
                { reg_number: 'EES/18/GEL/00115', sirri: '$2a$13$jU0xMfWZ9RtuwTIbqhqyVuQrklZwCYx6Q/yGZecgLbSpSMvY1mlO.' },
                { reg_number: 'EES/18/GEL/00102', sirri: '2222' },
                { reg_number: 'EES/18/GEL/00157', sirri: '2222' },
            ]);
        })
        .then(function () {
            // Inserts seed entries for lecture_note
            return knex('lecture_note').insert([
                { id: 11, course_name: 'Advanced Igneous Petrology', level: 4, course_title: 'Advanced Igneous Petrology', lecture_note: '\\x4c454354555245204e4f5445204f4e20414456414e4345442049474e454f555320504554524f4c4f47592e646f6378', file_path: 'lecturenotes\\1701290347071_LECTURE NOTE ON ADVANCED IGNEOUS PETROLOGY.docx', course_code: 'GLG4303' },
                { id: 12, course_name: 'Photogeology and Remote Sensing', level: 4, course_title: 'Photogeology and Remote Sensing', lecture_note: '\\x474c47343230372e706466', file_path: 'lecturenotes\\1701290436822_GLG4207.pdf', course_code: 'GLG4207' },
                // Add more lecture notes as needed
            ]);
        });
          };