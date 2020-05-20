create table tasks
(
  id int not null auto_increment primary key,
  name varchar(50) not null,
  start date not null,
  end date not null,
  target_amount int not null
)