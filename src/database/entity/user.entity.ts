import { Exclude, Expose } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string

  @Expose()
  @Column({ name: "用户昵称" })
  username: string

  @Exclude()
  @Column({ name: "密码" })
  password: string

  @Expose()
  @Column({ name: "用户头像", default: 'http://zy.img.qiuyue.space/default.webp' })
  avatersrc: string

  @Expose()
  @Column({ name: "账户性质" })
  roletype: string

  @Expose()
  @Column({ name: "电子邮件" })
  email: string

  @Expose()
  @Column({ name: "性别", default: null })
  gender: string

  @Expose()
  @Column({ name: "地址" })
  address: string



}
