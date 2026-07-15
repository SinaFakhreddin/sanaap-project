export type CreatorUser = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
};

export type ProvinceBase = {
  code: string;
  country: number;
  creator_user: CreatorUser;
  id: number;
  is_active: boolean;
  name: string;
  name_split: string;
};
export type ProvinceBaseRs = ProvinceBase[];

export type CountiesBase = {
  id: number;
  is_active: boolean;
  name: string;
  fanavaran_code: string;
  name_split: string;
  province: ProvinceBase;
  creator_user: CreatorUser;
};

export type CountiesBasRs = CountiesBase[];
