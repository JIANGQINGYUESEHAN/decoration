import { Exclude, Expose } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id: string

  @Expose()
  @Column({ comment: "用户昵称" })
  username: string

  @Exclude()
  @Column({ comment: "密码" })
  password: string

  @Expose()
  @Column({ comment: "用户头像", default: 'http://zy.img.qiuyue.space/default.webp' })
  avatersrc: string

  @Exclude()
  @Column({ comment: "账户性质", default: "user" })
  roletype: string

  @Expose()
  @Column({ comment: "电子邮件" })
  email: string

  @Expose()
  @Column({ comment: "性别", default: null })
  gender: string

  @Expose()
  @Column({ comment: "地址" })
  address: string



}
