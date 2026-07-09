import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tpmwftknomweufpkosyf.supabase.co";

const supabaseKey = "sb_publishable_p7Gf5Ib3F4SbfgulY4YCTg_CCjy_QuZ";

export const supabase = createClient(supabaseUrl, supabaseKey);