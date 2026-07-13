import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const LOGO = [
  "/9j/4AAQSkZJRgABAQAASABIAAD/4QDsRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAA",
  "C5ADAAIAAAAUAAAApJAEAAIAAAAUAAAAuJAQAAIAAAAHAAAAzJARAAIAAAAHAAAA1JASAAIAAAAH",
  "AAAA3JKQAAIAAAAEMDAwAJKRAAIAAAAEMDAwAJKSAAIAAAAEMDAwAKABAAMAAAABAAEAAKACAAQA",
  "AAABAAAF/qADAAQAAAABAAABdgAAAAAyMDI2OjA3OjAyIDExOjM4OjU0ADIwMjY6MDc6MDIgMTE6",
  "Mzg6NTQAKzAxOjAwAAArMDE6MDAAACswMTowMAAA/+0AfFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAA",
  "AABEHAFaAAMbJUccAgAAAgACHAI/AAYxMTM4NTQcAj4ACDIwMjYwNzAyHAI3AAgyMDI2MDcwMhwC",
  "PAALMTEzODU0KzAxMDA4QklNBCUAAAAAABAuSZweElyuWCWuEkeDs7QN/8IAEQgBdgX+AwEiAAIR",
  "AQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAMCBAEFAAYHCAkKC//EAMMQAAEDAwIEAwQGBAcGBAgG",
  "cwECAAMRBBIhBTETIhAGQVEyFGFxIweBIJFCFaFSM7EkYjAWwXLRQ5I0ggjhU0AlYxc18JNzolBE",
  "soPxJlQ2ZJR0wmDShKMYcOInRTdls1V1pJXDhfLTRnaA40dWZrQJChkaKCkqODk6SElKV1hZWmdo",
  "aWp3eHl6hoeIiYqQlpeYmZqgpaanqKmqsLW2t7i5usDExcbHyMnK0NTV1tfY2drg5OXm5+jp6vP0",
  "9fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAQIAAwQFBgcICQoL/8QAwxEAAgIBAwMDAgMFAgUC",
  "BASHAQACEQMQEiEEIDFBEwUwIjJRFEAGMyNhQhVxUjSBUCSRoUOxFgdiNVPw0SVgwUThcvEXgmM2",
  "cCZFVJInotIICQoYGRooKSo3ODk6RkdISUpVVldYWVpkZWZnaGlqc3R1dnd4eXqAg4SFhoeIiYqQ",
  "k5SVlpeYmZqgo6SlpqeoqaqwsrO0tba3uLm6wMLDxMXGx8jJytDT1NXW19jZ2uDi4+Tl5ufo6ery",
  "8/T19vf4+fr/2wBDAAICAgICAgMCAgMFAwMDBQYFBQUFBggGBgYGBggKCAgICAgICgoKCgoKCgoM",
  "DAwMDAwODg4ODg8PDw8PDw8PDw//2wBDAQIDAwQEBAcEBAcQCwkLEBAQEBAQEBAQEBAQEBAQEBAQ",
  "EBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/2gAMAwEAAhEDEQAAAfvDbaLtlUnbVlJ1",
  "bZVJ21bbVttW21bbVttW21bbVttW21bbVttW21bZVJVtSVbVttW21J21ZWTW21bbVlJ1bZVJyk1t",
  "tW21bKTW21bbVttW21bbVspNbKTW21bbVttW21ZSdWyk1lJVSdtW21bbVttW21bbVspNbbVttW21",
  "bbVttWyVVttW21bbVttW21bKTW21bbVtlUlSVUnKTWyk1ttW21bbVspNbbVttW21bKTWytSdtW21",
  "bbVttW21bbVttW21bbVttW21bbVttW2VScrUnbVttW21bbVtlVk7VttW21bbVttW21bbVttWUnVl",
  "J1bZVZO1bMfEXvfN8O+Yb5fpir8laFl/YjfjjZOv69K/Knvsm/RjfH/t+WnqOSrJ8nattqVk6tsq",
  "k5WrJVqTlJrbaspKqTlasnatlaslWpOVqTtq2yqTtq22rbattq22rbattqUnatlJrbattqyk6lZO",
  "rbattq22rbattq22rbattq22rbaspOrbattq22pSdqUnKpO2rbalZOpSdqUnKpO2rbalJyqyVJrb",
  "aspOrbattq22rbattq22rbattq22rbattq22rbattqysmlJyqTtq22rbattq22rbattq22rbattq",
  "2yqTtq22rbatsqk7xf4H3y+7fkv5e3ocltWj3XipKhyqUnTKTtWVk0RKVV3n1P8ADWx0/Z3q/wAR",
  "frnz+v8AQFVD0HHuNW89r0RP4yte7m/aTfi7jftFvxd1ftFvxd1ftFvxb1ftJvxb1ftJvxd1ftFv",
  "xd1ftFvxd1ftFvxd1ftIn8XX1fskr8j/AERG/SrfHX0pzadjtkfbalJ2rbattq22rbattq2Umtsq",
  "k7attq22rbattq22rbattq22rZSa22rbattq22rbattqyk6lZKqSpOrbattq2yqTtq22rKya22rb",
  "atsqkqTq2yqTlDpW2rbattq22rbattq22rbattq22rbattq22rbKpOyqTtq22rbakq2rbattq22r",
  "bKpO2rbattq2Umttq2VylXfwR454/wCnwkHk9vOrbVtrqqXfX77m2+ROq+l/YVb5B8r/AFIpcNfy",
  "vV+h/kXTh8mp268dslZWya6/9GPy6Vht+4BPir7b8nu+ZfzX/br5O68PzuSQfqcW2SsrJ1KydStk",
  "0rZNKSrVslVbJVW21bbVnDdVfXH3l+Kvf8XR+w+4jufM7k5Sa22rbattqzR34m983sfkVPreb9dE",
  "+QdX1wf4+037S9H8n/WXk+gnbJbbUr44+xfyd6cPUh/Ju9Dk+tvYfzo+jM9P04Vt5XdqC/8AMTfH",
  "7f5P3teb9YE+SVC/X/0f5z+jPI9LfKH1b+bO2VhvlFPp+f8AVm+VUz/VivlPV9VK+Uct9XK+T819",
  "n/fP4s/tR5nXk7c2+yfz51T6j+V/kbelxeyczwKenD0TrvD0q/2z9afjlYc237cK+W/qLzezbZG2",
  "2rch5h+aPTh9j+JeFp9Pk9EDwadMvXPQPmVWb/oF9N/jB98cPX9nbbh6dtq22rbattq22rbattq2",
  "2rbattq22rbKpO2rbattq22rbatsqk7attq22rbattq22rbalbU1U/5UWXlfq8OyVdfPslVJUlVe",
  "xe8tfjTm6HTMf1Bpn738zr+e8dPqT6U/MdLX2Z71+Xf2dg3hPkvXcj3c22SwVtqSrat9qfFeyb9y",
  "CfHP2B4/o/nt8hftt+SHocnm227efKTq2yqTsqkq2pOVqTiJpOVq2yYK20UqSqttq9W/Wf8AEL7/",
  "APP6vsnbef2bbVttW21b4h+3vyr6sPDUqT7HnbbTbbLfU36SfjH+zHl96ttx77bVvyb/AFk/Jvsx",
  "8d2T63mq+jPnH6O59v0623i+lvM/TPM3vyFSpPv+TtlKP04+jPnH6Q8X1N+Z/wCmH53aD5I14n1v",
  "MpVW1XQ9tHbWVV+ugwcftJ+QP7Deb6A1Zpw7/If5/dJzft+btk75kTdfRuZ+Wt9I/OzK3yUtOv1l",
  "/JL6m5N/0kTk+R6CqK9+XXvz5odvf8hKkqYbez+p8+3yLvq/zYJ4z+gHwj+hfNv9TqUnze7batsm",
  "lbattq22rbattq22rbattq22rbattq2yaVtq22rbattq22rbattq22rbattq2yqT+bv03+YHdzJy",
  "VelxZKtW2TSvavFftTDT558x6DnWur+ueZ+Wc2qcofTirJVW9A8/Up+jPnP7e+IVdOTtM8rattq2",
  "2p1+rf5Nel8236/+E+1u/I9D8Nd9EfO/veUlWzBKtq7D7R+Uv108/t+N99kbn0+OU/ZGr43n7H0/",
  "xy3+ztJ+dfzz+ywNF/ERP2H8felwjVswyVJpXpXmuU/uRuV6rwfV22rbattqZ/in+on5W+nxpSrd",
  "vKa27ztc9PnLKTpnv15/Ib9AOLo+yNleZ3J21K/Jn9ZPyd7sfG9t6nnp+jvnH6O59P0623i+lvM/",
  "TPMzfkKlSfofJ2ylv02+kPnH6O8L08pOR8E2oP4h/t9+H/fyBVt6PIT9Pvy//ULk6foRKt5XarJ1",
  "J8b9m+UdU/OdO3t+Zsm2h+oXug1eB6++Ift7yXRPyR23t+YrquVTD9yFU9t8/wCur4T+6PhHqz+K",
  "cnex5u9k8d9OzP68Zq48H1VJxKBi6ttq22rbattq22rbattq22rbattq22rbattq22rbattq22rb",
  "attq22rbattq22rbalJVqzZz8xPfDPnCk+75CVJVHbatkqrfc/wx9cc+3yWq4uts/TvE6fQSlWYZ",
  "KtW2TX2l8W/Yvy5zbc6rbpx22rbJpWSqttq/Qn6//HH9h/I7/G/yi/cb8i9V8r23pcSslVerfrl+",
  "Rf65eX3q23HvttW21bbUrJ1NvyQ/Xj4f6sPhXKT63BlbViD1fq77X89/QnhentlI6dtW21fC/wAQ",
  "+yeN+55icrbZfYHXdl2Xk+j+VKiJ9bzk/R3zjeZv+1mEXwfVyk6t+T/6wfk72c3jaVJ9bi30d84/",
  "R2On6dbbw/S3mvpXmpvyDTk+/wCSrbV+nX0d84/R3i+ntti+21B/EH9vvxB7+Qe29Hk36ifl7+oX",
  "J0fQm28ru22rfFP2t8N9Gfw3tvY83d1wvoSn9hkkT8/6u5LraFr8V07fReRtlKf2G9A8n9Y8D1t8",
  "t/UVIy/isnqOZ93ykqyWHp/2l+byubX9u3f4z/Y/F2faOaPePdO2rbattq22rbattq22rbattq22",
  "rbattq22rbKpO2rbattq22rbattq22rbattq22pW2pP5Q/pT+OHdzD23pcW21ZKtW21b07zHslb1",
  "zw/6Q+YUb0Ly/wBM87prttc9tqVkuKffVdp4TydHjysnr51ZKqycqttq2TqV+nv5hfU3Nt+kHxb9",
  "qeaeX3fkBlJ93y9sqvVP10/Iv9dPL79tuPfbattq2yqTlJpPxl9m/nXvl8l5W9nztk6lKG4r9XfZ",
  "aW68D1tthbbVqm28Be/MFmQfv+Skg+4zH6x9E53hev8AiOz9a8l93ysROYfrH7H8Vfavienttk+/",
  "Jv8AWT8m+7Hx1Kt6nnp+jvnH6O59P06yk+L6W8x9O8zN+Qe29/ydtq/Tj6Q+b/pLwvTTtkfZSaD+",
  "IP7ffiD38w9t6PFv1C/L39ROTo+hNt5XdslVb4T+7Phvoz+G9t7Hm70Tzv0LNv2ISpPg+pqG+51r",
  "8WUq30HlZSVQ/Wj17yv1TwvW22S8S/Mb9pua6sPxc32p8m+pw87lJ0TZWh7J+pP4pfZPB2/fu28z",
  "s22rbattq22rbattq22rbattq22rbattq2yqTtq22rbattq22rbattq22rbattqykqr5H/O/6l+W",
  "PX8/bbpxTsqsnKpOVqzpr9g5nuflX6q+e+bq8LGRPfyJVsttk0buuD+g8tOx+SfT/LlG226bZVJy",
  "k0rJVW21bqOXyj9xtw/eeD6/4t8z7x4P73lJyksPWP1w/I39dvJ705O5d1balJ2pScmlEa+FG738",
  "h+t4D1vPTsrpxydq3uHiP6fc230QrbyPQ2yqycqk/BP3t+TfTh43sr2eBNgxTJ6Inz1ObXFTlaFO",
  "2W9+/Ur8S/2p8vtd5SePp35M/rJ+VXZj4dsr1vPT9IfOPvWGn6nDSTxPS3mfpnj735MpUn3fJ22r",
  "9Ovo75/+gPC9PbZH22of4f8A7ffiD38g9t6PJv1C/L39ROTp+hNt5XbttW+Mfs75k1X81Eq3u+Sn",
  "tOLeZn9vM2d+D66eR6zxx78nMQfv+TtjLfsV3DF94HrbbC22rV9hq+Svhf8AZ/597MPy7Tk+t5u7",
  "biTZt+4W28H19tq22rbattqyVattq22rbattq22rbattqyk6ttq22rbattq22rbattq2Umttqysm",
  "tsqvyT8h6rlfe8vbZl22rJ2pW2o32/8AFH3bzbfAn0L5/wCfMv198k2H15np8T7r+S6+ZKg+4ZN4",
  "n9nej/MnP0+Ft8rt5E5SYq1hXw2eM47bVslVZSVV+n30R8jfW/ien+efyL9yfDfpcSVJV042XtXg",
  "eQ/QCfAVLe9K8B0/vyvn/V79W+J6uk5vbXLbaOSpNZW+t8yP9F2znyPSTtsn22rKTqqfxX/UD8uf",
  "T4wqye3lIlX6J5t+dSv0gTlp+b+/Rj88dEapUrVE/rB+UP3JydH3EnE8ruT+c/6LfMHRl+bSVJ9z",
  "zNaVOzP7D+h/iT6h5/X+tP56fPPCupB5XfypUnuMz+pnoiVeD6+21bbUH8Qf2+/D/v5E7K9HkT+o",
  "n5d/qJydH0JtvK7ttq3nPo2N+HO9Q8t93yspO0H6PfV34b+seb1/rV+dni3m+qJUNXbz70bzv7Nw",
  "0++cpPieluG7X5jesfbPxaV6HH+4ivxf7LJ/1q+VPi7zl0yVb0ePWFX7Jmf1kUpPg+vttW21bbVt",
  "tW21bbVttW21bbVttW21ZSdW21bbVttW21bbVslVbbVttW21KTtW21ZSVV+Ite+r/oPKVkqhsnUp",
  "Kriqf6R9Q8E5Oj2X5Op07Z9t0HlPVFOZN7N4i19Sc/8AOP37w9Pw99N/PX0DqeF9J+ZftLK+GWeT",
  "6HHlZK3238TfpT+cHJ2fXvx1+jX5x6InK3Tz7bVttX3v9o/Ff2l4/pfF/wAE/fXwP38o9t08+21Z",
  "WTStk1lJ1ZW1JVtW21ZSdX2p94/hx6B5/V+xG+dPpHi7B5WSTtqysmvhH4n9u8R9zzdkk2x9C/Xr",
  "88f0Y8n0U5O49x/lP+r3wP04fGKVJ9ng3vngthmf20zZ74PqpaPdX5D+W/sZ+aPr8PkOyuvnTlJr",
  "K2lyVXEan9IKT6/8vu224enbattqD+IP7ffiD38w8pXp+en9Qvy9/ULi7PoRSd5XblJVSdtXgf5c",
  "/uF82dmH5lK6bmfU89OUlrKSqXJV6krcp+u3LeqeR6CUq3Nun5n+mvBHT8tkum/v+WPJUpytmTJV",
  "YUx/SLj/ALS8v0NtuHp22rbattq22rbattq22rbattq22rbattqyk6ttq22rbattq22rbattq2yq",
  "ydqUlSaUnavxZ5307zH3vKTtmCtuvUF+wnPwVzdNlQq3Xzp21ZSdVj6n47kN9798x2of6a8y9U87",
  "4+my8n5cPTzfVvifCfdeenwkT6oU6+n/AAZ9r+Zc+/r3wT95cHXyXvqjxfr5vPVKTvnlJy36EfYH",
  "zD9NeJ6fxT8H/ZXxv6XEnK3TindV9hYafCu+7kTfCifu7LfCe+6lV8J77wr2vh/fWHl75ePpMHQZ",
  "WTSttRPtz4d2R/chXy39TeP6qdlJYalV89Un09tV+VR/VinTzf0jbDTbJBVxPbavlNP1dtV+XSfT",
  "2gE22T5KtWUnV414Z9sbVPzpa/o8TXP867/71SjfMX0Jc7Nttkfbattqyk6t8gfX+e+LXn2Ntcvj",
  "f6d6vZNtsj5SdW21bbVV/PP01nT4R5/9Dtov589f9rqN4Z7cvYa7bC22rbaqjwv6Lz3xHz/39tMv",
  "z1tvvJVfK/0L0OzbbZH22rbattq22rbattq22rbakq2rbattq22rbattq22rbattq22rbattq22r",
  "battq22rbavzF+cfuz4V9nz07bfFX3D8gfTvNt8oVqVdOKcrVkqcU1Vk1ttSsnV7rd+A/V/J0fIX",
  "T1np2+Hrth5he8fYmm8/4vp5vXuf8v1dtztarVPQPqX5a6rDfsfmj7J8frxJQ7Dp5v1e9ar33z/r",
  "/mN85ehee+55aVbaL6x+uX5G/rh5ffttx77bVttWSrUkmTXln5xfrhzm+X4tbpOb9nzUq2ilW1df",
  "+xn4ifp15/V9HZSfP7Nlak7attq22rbattq22rbattq22rbattq2VqTtq22rbattq22rbatsqk7a",
  "ttq22rbattqyk6tsqkqTqUnattq22rbatsqkqTq22rKTq22rbattq22rbattq22rbattq22rbabb",
  "aXbattq22rbattq22rbattq22rbattq2yqTtq22rbavFvyi/cL8a/Q4+P2V6HL9QeJ/UnxTzbD23",
  "Xjk7LbuuH9CVvPx9Bz7JttHKSqle/fP9xke+7r1z5Z5+z0dp6B5e2XC3HoXkbHh1KT082Ukaj6s+",
  "dfrjx7m6vfvlr6n+FIN/dPC/vzTP7K5bp/lvyfS/N8ak+75KslVer/rj+R/64eX37bce+21bbVtt",
  "W21bbV+e3yB+gH5/+v5+Tt047ZVb7V+LPqjDT9HslXjelttW21ZSeYqi7f8AND6v3y9q8O/OHrOr",
  "H9Avd/xyeAfrjX+a/HvNv+nOicNdtq22rbfLz30nwPxj8s9fN+3J/gyzw0+2PPfj75K3z/bsvwL7",
  "/wA23ve2yfbattqyVeUGL6h+dPpO+X0R4V+e6e3m/Rr6L/Frolb9kOf8x+PuPf8AUPMnuGuUnVtt",
  "WytScrUnbgK71Xgnsj1vtkspOrKSqk7atuR4d72bZSScj58r6G21ZKtW21bbVttW21bbVttW21bb",
  "VttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW+E/uzldV/GElkn3fK+zfh77I+N+TdOVu",
  "nFJEmq8o+4IunYeF/XnyLkydtvjspNKUnV9Pec2xeLr9o+e+iIl614F9UfOs3g+ye7iJ33B/Z+W0",
  "ca76Tk6Wfx5dU/bwuP2Y+Gv0L87u35g/oV+OOit9t6XFlbV6v+uP5H/rh5ffttx9O2VKnbUpO1bb",
  "VlJTXxN8Je6eG+z5g1bbpslVb6e+Yfsbn0/QLbeP6m20u21J+Kftr81urD62/NL9JPyv6cCfpd+a",
  "P6GtcJ8V/WPyc6+7/SH59fqtlqz98+J/trh6U7bJttq35L/rR+R/Zh5TcdV+gvXzfl0P1jyvrwGr",
  "1C2zfxv6s+fffMNP0aJt5HobbVttSvzm/RX8zd8vr38sPvLyLrx+alfYPoGuX59b7ovlb4x+4/jD",
  "79V6j6W+Afv7h6crJybKSGnCfza807MP1uV+RpK+pfgg1f38O677H8Kz1/Qr0D88f0O83t22yfKT",
  "qV4T5H8H93N0n1R8V2Xocn7aK/F3748vt+ivxR7LkevD65/QT8RvXa/WtPB955XdttW21bbVttW2",
  "0220u21bbVttW21bbVttWUnVttW21bZVJ21bZVJ2VSdtW21bbVttW21bK1fBXzp+svwd3c3E/O/r",
  "3kPdzbbaZ5KlV6hb+OfbXJ1PfhL3Dw9s07bpxUnatsqnH1R8n/QWG3mf1b85cGreuej9t5pzb/K+",
  "cN/S8/3HvOp4Xz+6eXceAa5Ks67740z+oetHxvj+l8a/G9lW+35SdlaDZOr1j9cvyL/XTy+9SduP",
  "dSdqUnattq23FV2vzf5N8Vd3MEe3qcG2ytttSv0e/O/9leLo6PbeZ3bbVttSfzP/AEy+MOrP1r8s",
  "v1I/OHp5eP8AevAf0GZfj/z36e+X9Fefqd8b+w828fbHgnvPJ0K22T7bUn8nf1k/JPv5uk+5Pyf7",
  "7ow9A8Db7fP6M6j5NUo9Q9Y+VfqTDf8ASTDJ5XdttW21J/M39Nvzy3y7Wt9w/Lnpw+6K/wCG1ar9",
  "z8b8mJ1X6X+rvg36849+G++PmX6S5tlbbJ8wf6vyZ8j/AGt5bu5vz7+ff3A8xZPyJV9g/IHdzfo/",
  "8+fLtxhr9Nfox5L615vbttk+21fmv8x/uJ8aehyfAiXH1B183z99TfXT7g7fxs36o/lV6HIrp+9/",
  "S/BuM9o28vv22B22rbattq22rbattq22rbattqyk6lJ2pScqk7attq22rbalJ2rbattq22rbattq",
  "22rbaswfqW/G3hes5f6LyB2Velb07qvC/dObpP8ASHAeic2/58s8n1ODZSa2IpgNOJnD7r099lrz",
  "Xh/1Vya6d9y3qnnmGvmfSc6TVPdPBu66tT8ijT3Hbx9x+qfP9L4nqb8zfpP82uzFKVbv4ttqTlar",
  "D0Dy/Q9Q3l+R/UFeX6vUE+Y6vTg+bproufyXRSdmG21bbK227OH0J+iPO9F4nqbbZPttWUnUrmuj",
  "1flr9q9t6Bvl+Ma/2C8d6sPzG9G/Qj2BLxf4p/SdlzdPTpysn22rbak/nx+hOdPyrX+qO6c/yrT+",
  "q2r8p1fqtq/Kn6O+yFZMnbYa7bVttSvNPSR1+bvtPufpm+X4isf2X8V7Ob8zPQf0K9xybyH4n/S+",
  "iw360+2Gu21bbVttW21J8B+gM98k+/dxpNtkfbKpO2rbavEOc+ks6KSlSPW/Ev3Up0ZPdkfbattq",
  "22rbattq22rbattq22rbattq22rKTqUnKpO2rbattq22rbatkqrbattq22rbatlJrbKpKsmvxd5f",
  "0Lz33vKN7NwvOte1W3itTzb/AE3Z+Q+Pq/1iP5YtNcvpO/8ADvOsn+ree8B6CHtPUfGn07XgXM4f",
  "TzKIPMd03UfRPN0cH5x2vN4a8b9A+A2GuVX+ot73HJ0tfOb38nhUNOnez52ykrbJVSslNKydSslV",
  "bbVlJzW2y221ZScyq2I0FSvpbHTxP9SOo67yO8Kk7DVW2rbatlJrKTq2yqSrJpScqhq2rbKpOyqT",
  "tq22rbKpOUmtlJrbatsqk7atlJpSVJrZSa22rZSa22rbattq2yqTlJrbattq22rbatsqkqTq2Umt",
  "lJrbattq22pKtq22rbattq22rbattq22rbattq22rZSa2yqSpKqTtq22rbattq22rbattq22rbat",
  "tq22pWSqslSa/LXwP7g+H/c81OSrTNXTczmGTspzxnqvqHZRvcPE/clfwv6U+Z/opG+eUhJvlkkJ",
  "HuO35T3Dk6UecereYrp5v1CvofTD7j4wX54/OrxPnPqVhr43ju98sOHm+c99QWXFyfJqvsJ5w4fH",
  "th9cB4ub5bsPpjcOPzub6C3Nh4ST3JPNl5C49W3Jj5m49G2eXnpu82GXEp7oavy6euCuQ+64s2V0",
  "yuRvOvr6K2qbr0vQMS06z2/d5f18PR/V/SbKT7Hr5C/k11+rCfm769on10+/OX7SVu2efj/+r7Lf",
  "J/Mb6lVvpc/wl0jL9iN/jfxWv0udfmL9XV9A235u/Xyt623+H/LNV/Tlx8y/S2GuUTn8EvFDNo7Z",
  "fxxVdGX2q/8Axl/X9GcF/I39I9F9Je/nV1y33aD4nrVb7eH+Zvvuuf1q6/MT6PTT6rX+bPpzr9tB",
  "+cfn9H/RRPx7ypT71B8W2SX1sn82/pRr6Y35jfSkfq9OVhonU1rmhBm+c939+cfmn7Rvl9buvy2+",
  "qMm+o9+bzTUfpa18m/MpB+zSQfAGbfoHP5qVm6/p8x+cPn+v0j3C91y67bVtk0rbVttW21bbVttS",
  "kqTW21bbVtlUnbUpKtSdtW21bbVttSk7VtlUnbVtlUnbVttW2VSdtStk15h+Q37kfDvZh8Mq9OT6",
  "XF5im8pWTbaO21bbqlPJ++df9E8m/wCaP2N7N33kc3yP5r9scn4nl+Mt/rD83ff9T031D4s3s7/X",
  "3cfAuzb9GXnzH9IfCfPcI1Vvxj8wHk4aKyiOo8rLDxM0lW0uysrBU6uut+b3eX3odfkqvcui9D0v",
  "m1P1f0fb3/Gdp9pOPS9D5D6D6c3peh8+9B7FvS9Lznouk3pdrd0ndfdts1ttW21bbTb5J+tvANc3",
  "/wAv76h3y+UvTs+a+Y/r/rqJbx7hOtPoqfOPoP0JW8l8x+k/Mll+yfOP1HXxn9LeEfT1fPnoUczX",
  "H/oD8dfZeTD+Jft5Pz3m0tsZXrep8L+S/UPpnoZ/nl97+cO6+SPpD1zyll8p6Tp+hm+bvdfS6auF",
  "+kvI/ccG/Ob6j8z6/VfNvJvqnoN1n5D+sWeDfO3cdL02i/Nvu/qtbm3zl+h3w/3yt81fTvm3T6L9",
  "hOm6vP3+NvpHuk+J5A/m36W8U+g9X4I+z2bTry+YPrLx30qvnro/SPr1b5A+dPo72jRWPyr7/wAd",
  "i3iND9DW2y/RnwX9UfP+LfRHuXl3qOGm2yPttW21bbVttW21bbVttW21bbVttWyk0pKtSdtW21bb",
  "VttW21bbVttW21bbVttW21bbVlJ1ZSVUnxD3EZvjHm/uLjMPP+QN79yPz/ict03NU/heJ7EbxU3g",
  "eX3HEh3ieIog0+fgQaiBfUfhz6m7b9b/AEb4jo/saj+4+m+Q7j7Cstx5p6Xeg+C+a8vJ7BafC/Je",
  "H76OvO3v+UyfY156Xd8V3n2RvQ9D5Uu/pDel3+FdD6on0O7iL+63f6CVbdPXts1ttW21bbVttWyk",
  "1ttW21bbVttW21bbVttWSrVlJ1ZKtWUnUoatWUnVtlUnbUrJ1KydW21bbVttWSrVttWUnVkq1ZSd",
  "SsnVkqVSVJ1KTtSVbUpO1bbUrJ1bbVttScrUrJ1bbUlW1KTtSsNVbbVttW21bbVttW21bbVttW21",
  "bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVqG+5Xk5vL/OfUGv598B4Cr6GT",
  "4/l/P6voZ9pp80q+nrbp3+S99hWm3X8V2H2s47un4ztvrbdvb8x230Iru7PEbT1rd3bwN30e6+mp",
  "ttuvsUnZmUnZrbattq22rbattq22rZWpO2rbattq22rbattqyVattqyk6ttqUnattq22rbattqUn",
  "attqyk6tlJrbattq22rbattq22rbattq22rbattq22rbaspOrbattq22rbattq22rbattq22rbat",
  "tq22rbattq22rZKq22rbattq22rbattq22rbattq2UmttqykqpOyqTiZYeJqHiah4moeJqHiZoeJ",
  "lh4yaHiah4moeJqHiah4moeJmh4yVh4moKiah4iqDiah4moeJqHiaYeJpR4mmHiKlDiah4yaHiZo",
  "eJlh4ipg4mlHiah4moeJph4mlHiah4moeJqHiah4moeJqHiah4moeJqHiah4moeJqHiah4moeJqH",
  "iah4moalah4mmHiah4mlHiaYeJpR4moeJqHiah4moeJqHiah4moeJqHiah4yaHiah4moeJqHiah4",
  "moeJqHiah4moeJqHiah4moeJqHiah4maHiZYeJqHiah4moeJqHiah4moeJqHiah4moeJqHiah4mo",
  "eJqVtplbaXbabbaXbattq22m22rJUmttqVtpUqSqZKkqpKkqpO2pWUmkqSqslSaVtqTtqVtq22rb",
  "ak7albaslSaUlSaVlakpUmspKq22lSoZJttqSpKqyVDoiVJpSVJpW2pKkqrbattqSpKpdtq22mSp",
  "KpU7aZW2rbattqSpKpU7aZW2rJUmspKq22pO2pSVJrKSqttq22pKkqpKkqpKkqlTtplbattq22pK",
  "kqrJUmspKqyVJpSVJrbalbattqTtqVtq22lTtplbattq22lydplJIOspKq22pO2rKSqttq22l22r",
  "battq22rbaslSZv/2gAIAQEAAQUC/wCnqNf+WdXN1bWcd/8AWV4UsHefXG7n61vFMxm8eeL5mvxZ",
  "4nW/6T+JGjxl4qicP1j+MIXafW9v8Tsfrg2qV7b4y8M7r/yzPe/rC8ObId3+tTxBfO6vLq+l/m9q",
  "8T79sp2X63ntW+bTvcP3af6k1/5Yp4k8c7L4cHiDx1v3iE/6gt7m4tJvDf1rXdu9u3Kx3a2p28To",
  "3abY5d535En6a3l/pneH+mt5f6b3l/pveX+m95f6b3l/preX+mt5f6a3h/preH+m95f6b3l/preX",
  "+m95f6b3l/pveX+m95f6a3l/pvemjxJ4hjcHjnxbbuz+tfxPbvbfrf26U7V4g2fekf6iqP8Af7r/",
  "AL/bm5t7ODxZ9Z9zeMkqP3tGLW4UnbPDO+7y1/Vt4xQm/wBq3Pal/wAxs+97lsV14U+sHb/EY4vF",
  "+OvAkW+xyoXDJ/qeGSSCXw19ae4WR2/crHdLX+bnmjtobn64dx53+zf3l/7OHfH/ALOLe3/s397c",
  "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",
].join("");
const LOGO_URI = "data:image/jpeg;base64," + LOGO;


const PART_TYPES = [
  "Oil Filter",
  "Air Filter",
  "Fuel Filter",
  "Pollen Filter",
  "Wiper Blades",
  "Front Brake Pads",
  "Front Brake Discs",
  "Rear Brake Pads",
  "Rear Brake Discs",
  "Rear Brake Shoes",
];

const INITIAL_PARTS = {};
PART_TYPES.forEach(function(pt) { INITIAL_PARTS[pt] = []; });

// Each part entry: { id, reg, partNumber, cost, sale, date, notes }
const SEED_CARS = {
  "AB12CDE": { make: "Ford", model: "Focus", year: 2019, colour: "Silver", owner: "", nctExpiry: "2025-09-14", notes: "Diesel engine - use 5W-30 oil", services: ["Interim Service","Full Service","Brake Fluid","Front Brakes","Rear Brakes","Diagnostics","Other"], history: [{ date: "2024-11-10", service: "Interim Service", notes: "Oil and filter changed" }] },
  "XY63FGH": { make: "Toyota", model: "Yaris", year: 2021, colour: "White", owner: "", nctExpiry: "2026-03-22", notes: "Hybrid - check HV battery cooling vent", services: ["Interim Service","Full Service","Brake Fluid","Front Brakes","Diagnostics","Other"], history: [] },
  "LM54JKL": { make: "BMW", model: "3 Series", year: 2018, colour: "Black", owner: "", nctExpiry: "2025-08-01", notes: "Run-flat tyres fitted", services: ["Interim Service","Full Service","Brake Fluid","Front Brakes","Rear Brakes","Timing Belt","Diagnostics","Other"], history: [{ date: "2024-06-01", service: "Full Service", notes: "Full service + air filter" },{ date: "2025-01-15", service: "Rear Brakes", notes: "Pads and discs replaced" }] },
};

const ALL_SERVICES = ["Full Service","Intermediate Service","Brake Fluid","Front Brakes","Rear Brakes","Timing Belt/Chain","NCT Prep","Tyres","Diagnostics","Other"];

const BAND1 = { "Interim Service": 180, "Full Service": 300, "NCT Prep": 45, "Diagnostics": 75 };
const MULTIPLIERS = { "Band 1": 1, "Band 2": 1.20, "Band 3": 1.32 };

function getPrice(service, band) {
  const base = BAND1[service];
  if (!base) return null;
  return Math.round(base * (MULTIPLIERS[band] || 1));
}

function displayPrice(service, band) {
  if (service === "Diagnostics") return "EUR75 initial fee";
  const p = getPrice(service, band);
  return p ? "EUR" + p : "POQ";
}

function generateSlots() {
  const slots = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Use today's date parts to avoid timezone issues
  const todayStr = today.getFullYear() + "-" +
    String(today.getMonth()+1).padStart(2,"0") + "-" +
    String(today.getDate()).padStart(2,"0");
  // Find Monday: getDay 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
  const dow = today.getDay();
  const daysToMon = dow === 0 ? 6 : dow - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysToMon);
  // i%7: 0=Mon 1=Tue 2=Wed 3=Thu 4=Fri 5=Sat 6=Sun
  for (let i = 0; i < 42; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,"0");
    const day = String(d.getDate()).padStart(2,"0");
    const key = y + "-" + m + "-" + day;
    const dayInWeek = i % 7; // 0=Mon ... 5=Sat 6=Sun
    const isSun = dayInWeek === 6;
    const isSat = dayInWeek === 5;
    const isPast = key < todayStr;
slots[key] = {
  booked: 0,
  limit: isSat ? 3 : 4,
  past: isPast,
  sunday: isSun,
  saturday: isSat
};  }
  return slots;
}

const C = {
  bg: "#ffffff", panel: "#f4f5f7", card: "#eaecf0",
  accent: "#0f2044", accentHover: "#1a3566",
  text: "#0f1117", muted: "#555c7a", border: "#d0d4e0",
  green: "#22C007", orange: "#22C007",
};

const ADMIN_USER = "info@obautos.com";
const ADMIN_PASS = "VDff1600*!";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700&display=swap');
  :root { color-scheme: light only; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #ffffff !important; color: #0f1117 !important; font-family: Inter, sans-serif; min-height: 100vh; }
  input, select, textarea { font-family: inherit; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #1a1d27; }
  ::-webkit-scrollbar-thumb { background: #2e3147; border-radius: 3px; }
  @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
  .pulse-dot { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
`;

function Btn({ children, onClick, variant, small, disabled, style }) {
  variant = variant || "primary";
  style = style || {};
  const base = { display: "inline-flex", alignItems: "center", gap: 6, cursor: disabled ? "not-allowed" : "pointer", border: "none", borderRadius: 8, fontFamily: "inherit", fontWeight: 600, padding: small ? "7px 14px" : "11px 22px", fontSize: small ? 13 : 15, transition: "all .15s", opacity: disabled ? 0.45 : 1 };
  const variants = {
    primary: { background: C.accent, color: "#fff" },
    ghost: { background: "transparent", color: C.muted, border: "1px solid " + C.border },
    success: { background: "#1a4d2e", color: C.green, border: "1px solid #2ecc7133" },
  };
  return (
    <button onClick={!disabled ? onClick : undefined} style={Object.assign({}, base, variants[variant], style)}
      onMouseEnter={function(e) { if (!disabled && variant === "primary") e.currentTarget.style.background = C.accentHover; }}
      onMouseLeave={function(e) { if (!disabled && variant === "primary") e.currentTarget.style.background = C.accent; }}>
      {children}
    </button>
  );
}

function Input({ label, value, onChange, placeholder, uppercase }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</label>}
      <input value={value} onChange={onChange} placeholder={placeholder}
        style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 8, padding: "11px 14px", color: C.text, fontSize: 15, outline: "none", textTransform: uppercase ? "uppercase" : "none", letterSpacing: uppercase ? 2 : 0 }}
        onFocus={function(e) { e.target.style.borderColor = C.accent; }}
        onBlur={function(e) { e.target.style.borderColor = C.border; }} />
    </div>
  );
}

function DateInput({ label, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</label>}
      <input type="date" value={value} onChange={onChange}
        style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 8, padding: "11px 14px", color: C.text, fontSize: 15, outline: "none", fontFamily: "inherit", colorScheme: "light" }}
        onFocus={function(e) { e.target.style.borderColor = C.accent; }}
        onBlur={function(e) { e.target.style.borderColor = C.border; }} />
    </div>
  );
}

function Badge({ text, color }) {
  color = color || C.accent;
  return <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: color + "22", color: color, letterSpacing: 0.5 }}>{text}</span>;
}

function Card({ children, style }) {
  return <div style={Object.assign({ background: C.panel, borderRadius: 14, border: "1px solid " + C.border, padding: 24 }, style || {})}>{children}</div>;
}



function CustomerPortal({ cars, setCars, slots, setSlots, bookings, setBookings }) {
  const [step, setStep] = useState("lookup");
  const [name, setName] = useState("");
  const [reg, setReg] = useState("");
  const [carData, setCarData] = useState(null);
const [chosenServices, setChosenServices] = useState([]);
function toggleService(service) {
  setChosenServices(function(prev) {
    return prev.includes(service)
      ? prev.filter(function(s) { return s !== service; })
      : prev.concat(service);
  });
}
  const [chosenDate, setChosenDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [regMake, setRegMake] = useState("");
  const [regModel, setRegModel] = useState("");

  const [regMobile, setRegMobile] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regError, setRegError] = useState("");
function addToCalendar() {
  const title = "OB Autos - " + chosenServices.join(", ");

  const description =
`Vehicle: ${carData.make} ${carData.model}
Registration: ${carData.reg}

Services:
${chosenServices.join(", ")}

Customer: ${name}`;

  const start = chosenDate.replace(/-/g, "");
  const endDate = new Date(chosenDate);
  endDate.setDate(endDate.getDate() + 1);
  const end = endDate.toISOString().slice(0, 10).replace(/-/g, "");

  const ics =
`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description.replace(/\n/g, "\\n")}
LOCATION:OB Autos
DTSTART;VALUE=DATE:${start}
DTEND;VALUE=DATE:${end}
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "OB-Autos-Booking.ics";
  a.click();

  URL.revokeObjectURL(url);
}
function resetAll() {
  setStep("lookup");
  setName("");
  setReg("");
  setCarData(null);
  setChosenServices([]);
  setChosenDate("");
  setNotes("");
  setError("");
  setRegMake("");
  setRegModel("");
  setRegMobile("");
  setRegEmail("");
  setRegError("");
}

  function handleLookup() {
    setError("");
    const clean = reg.trim().replace(/\s/g, "").toUpperCase();
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!clean) { setError("Please enter your registration."); return; }
    const found = cars[clean];
    if (!found) { setStep("register"); return; }
    if (!found.owner) setCars(function(prev) { return Object.assign({}, prev, { [clean]: Object.assign({}, prev[clean], { owner: name.trim() }) }); });
    setCarData(Object.assign({}, found, { owner: found.owner || name.trim(), reg: clean }));
    setStep("select-service");
  }

  async function handleRegister() {
    setRegError("");
    const clean = reg.trim().replace(/\s/g, "").toUpperCase();
    if (!regMake.trim()) { setRegError("Please enter the make."); return; }
    if (!regModel.trim()) { setRegError("Please enter the model."); return; }
    const newCar = { make: regMake.trim(), model: regModel.trim(), year: null, colour: "", owner: name.trim(), mobile: regMobile.trim(), email: regEmail.trim(), nctExpiry: "", notes: "", history: [], services: ["Interim Service","Full Service","Brake Fluid","Front Brakes","Rear Brakes","Diagnostics","Other"] };
    setCars(function(prev) { return Object.assign({}, prev, { [clean]: newCar }); });
    const { error } = await supabase
  .from("vehicles")
  .upsert({
    registration: clean,
    owner_name: name.trim(),
    make: regMake.trim(),
    model: regModel.trim(),
    mobile: regMobile.trim(),
    email: regEmail.trim(),
    vin_number: null,
    nct_expiry: null,
    notes: ""
  });

if (error) {
  console.error("Failed to save vehicle:", error);
} else {
  console.log("Vehicle saved to Supabase");
}
    setCarData(Object.assign({}, newCar, { reg: clean }));
    setStep("select-service");
  }

  async function handleBooking() {
    setCars(function(prev) { return Object.assign({}, prev, { [carData.reg]: Object.assign({}, prev[carData.reg], { owner: name.trim() }) }); });
   
    setBookings(function(prev) { return prev.concat([{ id: Date.now(), name: name, reg: carData.reg, service: chosenServices, date: chosenDate, notes: notes, priceBand: carData.priceBand, car: carData.make + " " + carData.model }]); });
    const { error } = await supabase
  .from("bookings")
  .insert({
    registration: carData.reg,
    booking_date: chosenDate,
    service: chosenServices,
    mileage: null,
    notes: notes
  });

if (error) {
  console.error("Booking save failed:", error);
} else {
  console.log("Booking saved to Supabase");

  await supabase.functions.invoke("notify-booking", {
    body: {
      registration: carData.reg,
      name: name,
      vehicle: carData.make + " " + carData.model,
      services: chosenServices,
      date: chosenDate,
      notes: notes,
    },
  });
}

const { data } = await supabase
  .from("bookings")
  .select("*");

setBookings(data);
setStep("done");
  }

  const availDates = Object.keys(slots).sort();
  const stepIdx = ["lookup","select-service","select-slot","confirm"].indexOf(step === "register" ? "lookup" : step);

  if (step === "done") {
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>&#10003;</div>
        <h2 style={{ fontFamily: "Barlow Condensed", fontSize: 32, marginBottom: 8 }}>Booking Confirmed!</h2>
        <p style={{ color: C.muted, marginBottom: 24 }}>
          {"We'll see you on "}
          <strong style={{ color: C.text }}>
            {new Date(chosenDate + "T00:00:00").toLocaleDateString("en-IE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </strong>
        </p>
        <Card style={{ textAlign: "left", marginBottom: 24 }}>
{carData && [
  ["Name", name],
  ["Vehicle", carData.make + " " + carData.model],
  ["Registration", carData.reg],
  ["Services", chosenServices.join(", ")]
].map(function(pair) {            return (
              <div key={pair[0]} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid " + C.border }}>
                <span style={{ color: C.muted, fontSize: 13 }}>{pair[0]}</span>
                <span style={{ fontWeight: 600 }}>{pair[1]}</span>
              </div>
            );
          })}
        </Card>
<div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
  <Btn onClick={addToCalendar}>📅 Add to Calendar</Btn>
  <Btn variant="ghost" onClick={resetAll}>Book Another</Btn>
</div>      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
        {["Find Your Car","Choose Service","Pick a Date","Confirm"].map(function(s, i) {
          const active = i === stepIdx;
          const done = i < stepIdx;
          return (
            <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: done ? C.green : active ? C.accent : C.border, color: done || active ? "#fff" : C.muted }}>
                {done ? "v" : i + 1}
              </div>
              <span style={{ fontSize: 10, color: active ? C.text : C.muted, fontWeight: active ? 600 : 400, textAlign: "center" }}>{s}</span>
            </div>
          );
        })}
      </div>

      {step === "lookup" && (
        <Card>
          <h2 style={{ fontFamily: "Barlow Condensed", fontSize: 28, marginBottom: 4 }}>Book a Service</h2>
          <p style={{ color: C.muted, marginBottom: 24, fontSize: 14 }}>Enter your details to get started</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input label="Your Name" value={name} onChange={function(e) { setName(e.target.value); }} placeholder="e.g. John Smith" />
            <Input label="Vehicle Registration" value={reg} onChange={function(e) { setReg(e.target.value); }} placeholder="e.g. 262 D 12345" uppercase />
            {error && <p style={{ color: C.accent, fontSize: 13, background: C.accent + "15", padding: "10px 14px", borderRadius: 8 }}>{error}</p>}
            <Btn onClick={handleLookup}>Find My Vehicle</Btn>
          </div>
        </Card>
      )}

      {step === "register" && (
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 22 }}>&#128663;</span>
            <h2 style={{ fontFamily: "Barlow Condensed", fontSize: 26 }}>Register Your Vehicle</h2>
          </div>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
            {"We don't have "}
            <strong style={{ color: C.accent }}>{reg.trim().replace(/\s/g,"").toUpperCase()}</strong>
            {" on file yet. Fill in your details to continue."}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
            <div>
              <Input label="Registration" value={reg.trim().replace(/\s/g,"").toUpperCase()} onChange={function() {}} placeholder="" uppercase />
            </div>
            <Input label="Make *" value={regMake} onChange={function(e) { setRegMake(e.target.value); }} placeholder="e.g. Ford" />
            <Input label="Model *" value={regModel} onChange={function(e) { setRegModel(e.target.value); }} placeholder="e.g. Focus" />
            <Input label="Mobile Number" value={regMobile} onChange={function(e) { setRegMobile(e.target.value); }} placeholder="e.g. 087 123 4567" />
            <Input label="Email Address" value={regEmail} onChange={function(e) { setRegEmail(e.target.value); }} placeholder="e.g. john@email.com" />
          </div>
          {regError && <p style={{ color: C.accent, fontSize: 13, background: C.accent + "15", padding: "10px 14px", borderRadius: 8, marginBottom: 14 }}>{regError}</p>}
          <p style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>Standard services will be enabled. The garage can adjust these for your vehicle.</p>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="ghost" small onClick={function() { setStep("lookup"); setRegError(""); }}>Back</Btn>
            <Btn onClick={handleRegister} disabled={!regMake || !regModel}>Save and Continue</Btn>
          </div>
        </Card>
      )}

      {step === "select-service" && carData && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <p style={{ color: C.muted, fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 4 }}>Your Vehicle</p>
                {carData.owner && carData.owner.toLowerCase() !== name.trim().toLowerCase() && (
                  <p style={{ fontSize: 11, color: C.green, marginBottom: 4 }}>Registered to {carData.owner}</p>
                )}
                <h3 style={{ fontFamily: "Barlow Condensed", fontSize: 24 }}>{carData.make + " " + carData.model}</h3>
              </div>
              <Badge text={carData.reg} color={C.accent} />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Badge text={carData.colour} color={C.green} />

            </div>
            {carData.notes && <p style={{ marginTop: 12, fontSize: 12, color: C.muted, background: C.card, padding: "8px 12px", borderRadius: 6 }}>Notes: {carData.notes}</p>}
          </Card>

          {carData.history && carData.history.length > 0 && (
            <Card>
              <p style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 12 }}>Service History</p>
              {carData.history.map(function(h, i) {
                return (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < carData.history.length - 1 ? "1px solid " + C.border : "none" }}>
                    <span style={{ color: C.muted, fontSize: 12, minWidth: 90 }}>{h.date}</span>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{h.service}</span>
                      {h.notes && <p style={{ fontSize: 12, color: C.muted }}>{h.notes}</p>}
                    </div>
                  </div>
                );
              })}
            </Card>
          )}

          <Card>
  <p style={{
    fontSize: 12,
    fontWeight: 600,
    color: C.muted,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 16
  }}>
    Select Services
  </p>

  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    {carData.services.map(function(s) {
      const selected = chosenServices.includes(s);

      return (
        <div
          key={s}
          onClick={function() { toggleService(s); }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            borderRadius: 10,
            cursor: "pointer",
            border: "2px solid " + (selected ? C.accent : C.border),
            background: selected ? C.accent + "15" : C.card,
            transition: "all .15s"
          }}
        >
         <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
  <div style={{ fontWeight: 600, fontSize: 14 }}>
    {s}
  </div>

  {s === "Diagnostics" && (
    <p
      style={{
        fontSize: 11,
        color: C.green,
        margin: "4px 0 0 0"
      }}
    >
      Initial diagnostic fee - further works to be quoted separately
    </p>
  )}
</div>

          <div style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            border: "2px solid " + (selected ? C.accent : C.border),
            background: selected ? C.accent : "#fff",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700
          }}>
            {selected ? "✓" : ""}
          </div>
        </div>
      );
    })}
  </div>

  <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
    <Btn
      variant="ghost"
      small
      onClick={function() { setStep("lookup"); }}
    >
      Back
    </Btn>

    <Btn
      onClick={function() { if (chosenServices.length) setStep("select-slot"); }}
      disabled={!chosenServices.length}
    >
      Next: Pick a Date
    </Btn>
  </div>
</Card>
        </div>
      )}

      {step === "select-slot" && (
        <Card>
          <p style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 16 }}>Choose a Date</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 20 }}>
            {availDates.map(function(date) {
              const d = new Date(date + "T00:00:00");
              const isSat = d.getDay() === 6;
              const selected = chosenDate === date;
              return (
<div
  key={date}
  onClick={function() {
    if (
      !slots[date].past &&
      !slots[date].sunday &&
      slots[date].booked < slots[date].limit
    )
      setChosenDate(date);
}} style={{
  padding: "6px 2px",
  borderRadius: 6,
  cursor: (
    slots[date].past ||
    slots[date].sunday ||
    slots[date].booked >= slots[date].limit
  ) ? "default" : "pointer",
  textAlign: "center",
  border: "2px solid " + (selected ? C.accent : C.border),
  background: selected
    ? C.accent + "20"
    : (slots[date].past || slots[date].sunday)
      ? "#efefef"
      : slots[date].saturday
        ? C.green + "10"
        : C.card,
  transition: "all .15s",
  opacity: (slots[date].past || slots[date].sunday) ? 0.3 : 1
}}>                  <p style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3, color: (slots[date].past || slots[date].sunday) ? C.border : slots[date].saturday ? C.green : C.muted, marginBottom: 1 }}>
                    {d.toLocaleDateString("en-IE", { weekday: "short" })}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 700, fontFamily: "Barlow Condensed", color: selected ? C.accent : (slots[date].past || slots[date].sunday) ? C.border : C.text, lineHeight: 1.1 }}>
                    {d.getDate()}
                  </p>
                  <p style={{ fontSize: 8, color: (slots[date].past || slots[date].sunday) ? C.border : C.muted }}>
                    {d.toLocaleDateString("en-IE", { month: "short" })}
                  </p>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="ghost" small onClick={function() { setStep("select-service"); }}>Back</Btn>
            <Btn onClick={function() { if (chosenDate && !slots[chosenDate].past) setStep("confirm"); }} disabled={!chosenDate || (chosenDate && slots[chosenDate].past)}>Next: Confirm</Btn>
          </div>
        </Card>
      )}

      {step === "confirm" && carData && (
        <Card>
          <h3 style={{ fontFamily: "Barlow Condensed", fontSize: 26, marginBottom: 20 }}>Confirm Your Booking</h3>
{[
  ["Name", name],
  ["Vehicle", carData.make + " " + carData.model],
  ["Registration", carData.reg],
  ["Services", chosenServices.join(", ")],
  ["Date", new Date(chosenDate + "T00:00:00").toLocaleDateString("en-IE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  })]
].map(function(pair) {            return (
              <div key={pair[0]} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid " + C.border }}>
                <span style={{ color: C.muted, fontSize: 13 }}>{pair[0]}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{pair[1]}</span>
              </div>
            );
          })}
          <div style={{ marginTop: 16 }}>
            <Input label="Additional Notes (optional)" value={notes} onChange={function(e) { setNotes(e.target.value); }} placeholder="e.g. clicking noise on cold start" />
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <Btn variant="ghost" small onClick={function() { setStep("select-slot"); }}>Back</Btn>
            <Btn onClick={handleBooking} style={{ flex: 1, justifyContent: "center" }}>Confirm Booking</Btn>
          </div>
        </Card>
      )}
    </div>
  );
}


function ServicePicker({ selected, onToggle }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
      {ALL_SERVICES.map(function(s) {
        const on = selected.indexOf(s) >= 0;
        return (
          <div key={s} onClick={function() { onToggle(s); }}
            style={{ padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "2px solid " + (on ? C.accent : C.border), background: on ? C.accent + "20" : C.card, color: on ? C.accent : C.muted }}>
            {s}
          </div>
        );
      })}
    </div>
  );
}

function NctStatus({ nctExpiry }) {
  if (!nctExpiry) return null;
  const expDate = new Date(nctExpiry);
  const daysLeft = Math.ceil((expDate - new Date()) / (1000 * 60 * 60 * 24));
  const expired = daysLeft < 0;
  const urgent = !expired && daysLeft <= 30;
  const soon = !expired && !urgent && daysLeft <= 90;
  const color = expired ? "#e8472a" : urgent ? "#f39c12" : soon ? "#f1c40f" : C.green;
  const label = expired
    ? "NCT EXPIRED " + Math.abs(daysLeft) + "d ago"
    : "NCT due " + expDate.toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric" }) + " (" + daysLeft + "d)";
  return <p style={{ fontSize: 12, fontWeight: 700, color: color, marginBottom: 6 }}>{label}</p>;
}

// PART_TYPES removed - use PART_TYPES instead


function AdminPanel({ cars, setCars, bookings, setBookings, lastLoginTime }) {
  const [view, setView] = useState("vehicles");
  const [success, setSuccess] = useState("");
  const [editReg, setEditReg] = useState(null);
  const [nctFilter, setNctFilter] = useState(1);
  const [fMake, setFMake] = useState("");
  const [fModel, setFModel] = useState("");
  const [fOwner, setFOwner] = useState("");
  const [fMobile, setFMobile] = useState("");
  const [fEmail, setFEmail] = useState("");
  const [fNotes, setFNotes] = useState("");
  const [fNct, setFNct] = useState("");
  const [fVin, setFVin] = useState("");
  const [fReg, setFReg] = useState("");
  const [fServices, setFServices] = useState([]);
  const [editTab, setEditTab] = useState("details"); // details | parts
const [editBooking, setEditBooking] = useState(null);
const [newBookingDate, setNewBookingDate] = useState("");
const [showBookingEditor, setShowBookingEditor] = useState(false);

  function clearForm() {
    setFMake(""); setFModel(""); setFOwner(""); setFMobile(""); setFEmail("");
    setFNotes(""); setFNct(""); setFReg(""); setFServices([]); setEditTab("details");
  }

  function toggleService(s) {
    setFServices(function(prev) { return prev.indexOf(s) >= 0 ? prev.filter(function(x) { return x !== s; }) : prev.concat([s]); });
  }

  function showSuccess(msg) {
    setSuccess(msg);
    setTimeout(function() { setSuccess(""); }, 3000);
  }

  function handleAdd() {
    const clean = fReg.trim().replace(/\s/g, "").toUpperCase();
    if (!clean || !fMake || !fModel || !fYear || fServices.length === 0) return;
    setCars(function(prev) { return Object.assign({}, prev, { [clean]: { make: fMake, model: fModel, owner: fOwner, mobile: fMobile, email: fEmail, nctExpiry: fNct, notes: fNotes, services: fServices, history: [] } }); });
    clearForm();
    showSuccess("Vehicle " + clean + " added.");
    setView("vehicles");
  }

  function startEdit(r) {
    const c = cars[r];
    setEditReg(r);
    setFMake(c.make); setFModel(c.model);
    setFOwner(c.owner || "");
setFMobile(c.mobile || "");
setFEmail(c.email || "");
setFVin(c.vin || "");
setFNotes(c.notes || "");
    setFNct(c.nctExpiry || "");
    setFServices(c.services.slice());
    setEditTab("details");
    setView("edit");
  }

  async function handleSave() {
    if (!fMake || !fModel || fServices.length === 0) return;
   const { data, error } = await supabase
  .from("vehicles")
  .update({
    registration: fReg,
    owner_name: fOwner,
    make: fMake,
    model: fModel,
    vin_number: fVin,
    mobile: fMobile,
    email: fEmail,
    nct_expiry: fNct || null,
    notes: fNotes
  })
.eq("registration", editReg)
.select();

console.log("Editing registration:", editReg);
console.log("Returned data:", data);
if (error) {
  console.error(error);
  alert("Failed to update vehicle.");
  return;
}
setCars(function(prev) {
  const updated = Object.assign({}, prev);

  delete updated[editReg];

  updated[fReg] = Object.assign({}, prev[editReg], {
    make: fMake,
    model: fModel,
    owner: fOwner,
    mobile: fMobile,
    email: fEmail,
    nctExpiry: fNct,
    notes: fNotes,
    services: fServices
  });

  return updated;
});    clearForm(); setEditReg(null);
    showSuccess("Vehicle " + editReg + " updated.");
    setView("vehicles");
  }

  function handleDelete(r) {
    setCars(function(prev) { const next = Object.assign({}, prev); delete next[r]; return next; });
    showSuccess("Vehicle " + r + " removed.");
  }
async function handleDeleteBooking(id) {
  if (!confirm("Delete this booking?")) return;

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Failed to delete booking.");
    return;
  }

  setBookings(function(prev) {
    return prev.filter(function(b) {
      return b.id !== id;
    });
  });
}
async function handleChangeBookingDate() {
  const { error } = await supabase
    .from("bookings")
    .update({
      booking_date: newBookingDate
    })
    .eq("id", editBooking.id);

  if (error) {
    console.error(error);
    alert("Failed to update booking.");
    return;
  }

  setBookings(function(prev) {
    return prev
      .map(function(b) {
        if (b.id !== editBooking.id) return b;

        return Object.assign({}, b, {
          booking_date: newBookingDate
        });
      })
      .sort(function(a, b) {
        return a.booking_date.localeCompare(b.booking_date);
      });
  });

  setEditBooking(null);
  showSuccess("Booking date updated.");
}
  function Tab(props) {
    const active = view === props.id;
    return (
      <button onClick={function() { setView(props.id); if (props.id !== "edit") { clearForm(); setEditReg(null); } }}
        style={{ padding: "9px 18px", borderRadius: 8, border: "none", fontFamily: "inherit", fontWeight: 600, fontSize: 13, cursor: "pointer", background: active ? C.accent : "transparent", color: active ? "#fff" : C.muted }}>
        {props.label}
      </button>
    );
  }

  const VehicleForm = (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
<Input
  label="Registration *"
  value={fReg}
  onChange={function(e) { setFReg(e.target.value.toUpperCase()); }}
  placeholder="e.g. 262D12345"
  uppercase
/>
      <Input label="Make *" value={fMake} onChange={function(e) { setFMake(e.target.value); }} placeholder="e.g. Ford" />
      <Input label="Model *" value={fModel} onChange={function(e) { setFModel(e.target.value); }} placeholder="e.g. Focus" />
      <Input label="Owner Name" value={fOwner} onChange={function(e) { setFOwner(e.target.value); }} placeholder="e.g. John Smith" />
      <Input label="Mobile Number" value={fMobile} onChange={function(e) { setFMobile(e.target.value); }} placeholder="e.g. 087 123 4567" />
      <Input label="Email Address" value={fEmail} onChange={function(e) { setFEmail(e.target.value); }} placeholder="e.g. john@email.com" />
      <Input
  label="VIN Number"
  value={fVin}
  onChange={function(e) { setFVin(e.target.value); }}
  placeholder="e.g. WF0XXXXXXXXXXXXXXX"
/>
      <DateInput label="NCT Expiry Date" value={fNct} onChange={function(e) { setFNct(e.target.value); }} />

      <Input label="Tech Notes" value={fNotes} onChange={function(e) { setFNotes(e.target.value); }} placeholder="e.g. Diesel, run-flat tyres" />
    </div>
  );


  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontFamily: "Barlow Condensed", fontSize: 28 }}>Admin Dashboard</h2>
        <div style={{ display: "flex", gap: 4, background: C.card, padding: 4, borderRadius: 10 }}>
          <Tab id="vehicles" label={"Vehicles (" + Object.keys(cars).length + ")"} />
          <Tab id="add" label="+ Add Vehicle" />
          <Tab id="nct" label="NCT Check" />
          <Tab id="bookings" label={"Bookings (" + bookings.length + ")" + (lastLoginTime && bookings.filter(function(b){return b.id > lastLoginTime;}).length > 0 ? " !" : "")} />
        </div>
      </div>

      {success && <div style={{ background: C.green + "20", color: C.green, padding: "10px 16px", borderRadius: 8, marginBottom: 16, fontSize: 13, fontWeight: 600 }}>{success}</div>}

      {(function() {
        const newBookings = lastLoginTime ? bookings.filter(function(b) { return b.id > lastLoginTime; }) : [];
        if (newBookings.length === 0) return null;
        return (
          <div style={{ background: "#ffffff", border: "2px solid #f39c12", borderRadius: 10, padding: 16, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: newBookings.length > 0 ? 12 : 0 }}>
              <div className="pulse-dot" style={{ width: 10, height: 10, borderRadius: "50%", background: "#f39c12", flexShrink: 0 }} />
              <span style={{ fontWeight: 700, fontSize: 15, color: "#b7770d" }}>
                {newBookings.length} new booking{newBookings.length !== 1 ? "s" : ""} since you last logged in
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {newBookings.map(function(b) {
                return (
                  <div key={b.id} style={{ background: "#fff", borderRadius: 8, padding: "10px 14px", border: "1px solid #f39c1240", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <span style={{ fontWeight: 700, fontSize: 14 }}>{b.name}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: C.accent + "15", color: C.accent }}>{b.reg}</span>
                      </div>
<span style={{ fontSize: 13, color: C.muted }}>
  {b.service} - {b.car}
</span>

<div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 2 }}>
  <div style={{ fontSize: 12, color: C.muted }}>
📞 {JSON.stringify(b)}  </div>
  <div style={{ fontSize: 12, color: C.muted }}>
    ✉️ {cars[b.reg]?.email || "-"}
  </div>
</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: 700, color: "#b7770d", fontSize: 13 }}>{new Date(b.date + "T00:00:00").toLocaleDateString("en-IE", { weekday: "short", day: "numeric", month: "short" })}</p>
                      {b.notes && <p style={{ fontSize: 11, color: C.muted }}>{b.notes}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {view === "vehicles" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Object.entries(cars).map(function(entry) {
            const r = entry[0];
            const c = entry[1];
            return (
              <Card key={r} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: "Barlow Condensed", fontSize: 20 }}>{c.make + " " + c.model}</h3>
                    <Badge text={r} color={C.accent} />
                  </div>
                  {c.owner && <p style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>Owner: {c.owner}</p>}
                  {(c.mobile || c.email) && <p style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>{c.mobile ? c.mobile : ""}{c.mobile && c.email ? "  |  " : ""}{c.email ? c.email : ""}</p>}
                  <NctStatus nctExpiry={c.nctExpiry} />
                  {c.notes && <p style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>Notes: {c.notes}</p>}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
                    {c.services.map(function(s) { return <Badge key={s} text={s} color={C.muted} />; })}
                  </div>
                  <p style={{ fontSize: 12, color: C.muted }}>{c.history.length + " service" + (c.history.length !== 1 ? "s" : "") + " on record"}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
                  <Btn small onClick={function() { startEdit(r); }}>Edit</Btn>
                  <Btn small variant="ghost" onClick={function() { handleDelete(r); }} style={{ color: "#e8472a", borderColor: "#e8472a50" }}>Remove</Btn>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {view === "add" && (
        <Card>
          <h3 style={{ fontFamily: "Barlow Condensed", fontSize: 24, marginBottom: 20 }}>Register New Vehicle</h3>
          {VehicleForm}
          <p style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.5, textTransform: "uppercase", margin: "20px 0 10px" }}>Available Services</p>
          <ServicePicker selected={fServices} onToggle={toggleService} />
          <Btn onClick={handleAdd} disabled={!fReg || !fMake || !fModel || fServices.length === 0}>Register Vehicle</Btn>
        </Card>
      )}

      {view === "edit" && editReg && (
<Card>
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
    <h3 style={{ fontFamily: "Barlow Condensed", fontSize: 24 }}>Edit Vehicle</h3>
    <Badge text={editReg} color={C.accent} />
  </div>

  <div>
    {VehicleForm}

    <p style={{
      fontSize: 12,
      fontWeight: 600,
      color: C.muted,
      letterSpacing: 0.5,
      textTransform: "uppercase",
      margin: "20px 0 10px"
    }}>
      Available Services
    </p>

    <ServicePicker
      selected={fServices}
      onToggle={toggleService}
    />
  </div>

  <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
    <Btn
      variant="ghost"
      small
      onClick={function() {
        clearForm();
        setEditReg(null);
        setView("vehicles");
      }}
    >
      Cancel
    </Btn>

    <Btn
      onClick={handleSave}
      disabled={!fMake || !fModel || fServices.length === 0}
    >
      Save Changes
    </Btn>
  </div>
</Card>
      )}

      {view === "nct" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            <p style={{ color: C.muted, fontSize: 14 }}>Show NCT expiring within:</p>
            <div style={{ display: "flex", gap: 6 }}>
              {[1, 2, 3, 6].map(function(m) {
                return (
                  <button key={m} onClick={function() { setNctFilter(m); }}
                    style={{ padding: "6px 14px", borderRadius: 8, border: "2px solid " + (nctFilter === m ? C.accent : C.border), background: nctFilter === m ? C.accent + "20" : C.card, color: nctFilter === m ? C.accent : C.muted, fontFamily: "inherit", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                    {m + (m === 1 ? " month" : " months")}
                  </button>
                );
              })}
            </div>
          </div>
          {(function() {
            const now = new Date();
            const cutoff = new Date();
            cutoff.setMonth(cutoff.getMonth() + nctFilter);
            const due = Object.entries(cars)
              .filter(function(e) { return e[1].nctExpiry; })
              .map(function(e) {
                const expDate = new Date(e[1].nctExpiry);
                const daysLeft = Math.ceil((expDate - now) / (1000 * 60 * 60 * 24));
                return { r: e[0], c: e[1], expDate: expDate, daysLeft: daysLeft };
              })
              .filter(function(x) { return x.expDate <= cutoff; })
              .sort(function(a, b) { return a.expDate - b.expDate; });
            if (due.length === 0) {
              return <Card><p style={{ color: C.muted, textAlign: "center" }}>No vehicles with NCT expiring in the next {nctFilter} {nctFilter === 1 ? "month" : "months"}.</p></Card>;
            }
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {due.map(function(x) {
                  const expired = x.daysLeft < 0;
                  const urgent = !expired && x.daysLeft <= 30;
                  const color = expired ? "#e8472a" : urgent ? "#f39c12" : "#f1c40f";
                  return (
                    <Card key={x.r} style={{ display: "flex", gap: 14, alignItems: "center", borderLeft: "4px solid " + color }}>
                      <div style={{ textAlign: "center", minWidth: 64 }}>
                        <p style={{ fontFamily: "Barlow Condensed", fontSize: 28, fontWeight: 700, color: color, lineHeight: 1 }}>{expired ? "!" : x.daysLeft}</p>
                        <p style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}>{expired ? "OVERDUE" : "DAYS"}</p>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontFamily: "Barlow Condensed", fontSize: 18, fontWeight: 700 }}>{x.c.make + " " + x.c.model}</span>
                          <Badge text={x.r} color={C.accent} />
                        </div>
                        {x.c.owner && <p style={{ fontSize: 13, color: C.muted }}>Owner: {x.c.owner}</p>}
                        <p style={{ fontSize: 12, fontWeight: 700, color: color, marginTop: 4 }}>
                          {"NCT " + (expired ? "expired" : "expires") + ": " + x.expDate.toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                      <Btn small onClick={function() { startEdit(x.r); }}>Update</Btn>
                    </Card>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {view === "bookings" && (
        <div>
          {(function() {
const sorted = bookings.slice().sort(function(a, b) {
  return a.booking_date.localeCompare(b.booking_date);
});
            const grouped = {};
            sorted.forEach(function(b) {
  if (!grouped[b.booking_date]) grouped[b.booking_date] = [];
  grouped[b.booking_date].push(b);
});
            if (sorted.length === 0) return <Card><p style={{ color: C.muted, textAlign: "center" }}>No bookings yet.</p></Card>;
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {Object.keys(grouped).sort().map(function(date) {
                  const d = new Date(date + "T00:00:00");
                  const isSat = d.getDay() === 6;
                  const dayBookings = grouped[date];
                  return (
                    <div key={date}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                        <div style={{ background: isSat ? C.green + "20" : C.accent + "20", borderRadius: 8, padding: "6px 14px", textAlign: "center", minWidth: 70 }}>
                          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: isSat ? C.green : C.accent, letterSpacing: 0.5 }}>{d.toLocaleDateString("en-IE", { weekday: "short" })}</p>
                          <p style={{ fontFamily: "Barlow Condensed", fontSize: 24, fontWeight: 700, color: isSat ? C.green : C.accent, lineHeight: 1 }}>{d.getDate()}</p>
                          <p style={{ fontSize: 10, color: C.muted }}>{d.toLocaleDateString("en-IE", { month: "short", year: "numeric" })}</p>
                        </div>
                        <div style={{ flex: 1, height: 1, background: C.border }} />
                        <span style={{ fontSize: 12, color: C.muted }}>{dayBookings.length + " booking" + (dayBookings.length !== 1 ? "s" : "")}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 12 }}>
                        {dayBookings.map(function(b) {
                          return (
                            <Card key={b.id} style={{ display: "flex", gap: 14, alignItems: "center", padding: 16 }}>
<div style={{ flex: 1, textAlign: "left" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
      <span style={{ fontWeight: 700, fontSize: 15 }}>
        {cars[b.registration]?.owner || "Unknown Customer"}
      </span>

      <Badge text={b.registration} color={C.accent} />

      <Badge text={b.service} color={C.muted} />
    </div>


<div style={{ fontSize: 13, color: C.muted }}>
  📞 {cars[b.registration]?.mobile || "-"}
</div>

<div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>
  ✉️ {cars[b.registration]?.email || "-"}
</div>
    <p style={{ fontSize: 12, color: C.muted }}>
      {(cars[b.registration]?.make || "") + " " + (cars[b.registration]?.model || "")}
    </p>

    {b.notes && (
      <p style={{ fontSize: 12, color: C.green, marginTop: 4 }}>
        Notes: {b.notes}
      </p>
    )}
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

  {editBooking?.id === b.id ? (
    <>
      <DateInput
        value={newBookingDate}
        onChange={function(e) {
          setNewBookingDate(e.target.value);
        }}
      />

<Btn
  small
  onClick={handleChangeBookingDate}
>
  Save
</Btn>

      <Btn
        small
        variant="ghost"
        onClick={function() {
          setEditBooking(null);
        }}
      >
        Cancel
      </Btn>
    </>
  ) : (
    <Btn
      small
      onClick={function() {
        setEditBooking(b);
        setNewBookingDate(b.booking_date);
      }}
    >
      Change Date
    </Btn>
  )}

  <Btn
    small
    variant="ghost"
    style={{ color: "#e8472a", borderColor: "#e8472a50" }}
    onClick={function() {
      handleDeleteBooking(b.id);
    }}
  >
    Delete
  </Btn>

</div>
</Card>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {view === "parts" && (
        <PartsPanel cars={cars} parts={parts} setParts={setParts} />
      )}


    </div>
  );
}

function PartsPanel({ cars, parts, setParts }) {
  const [activePart, setActivePart] = useState(PART_TYPES[0]);
  const [view, setView] = useState("list"); // list | add | trends
  const [fReg, setFReg] = useState("");
  const [fPartNumber, setFPartNumber] = useState("");
  const [fCost, setFCost] = useState("");
  const [fSale, setFSale] = useState("");
  const [fDate, setFDate] = useState(new Date().toISOString().split("T")[0]);
  const [fNotes, setFNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function clearForm() {
    setFReg(""); setFPartNumber(""); setFCost(""); setFSale("");
    setFDate(new Date().toISOString().split("T")[0]); setFNotes(""); setError("");
  }

  function handleAdd() {
    setError("");
    const cleanReg = fReg.trim().replace(/\s/g, "").toUpperCase();
    if (!fPartNumber.trim()) { setError("Please enter a part number."); return; }
    if (!fCost || isNaN(+fCost) || +fCost < 0) { setError("Please enter a valid cost price."); return; }
    if (!fSale || isNaN(+fSale) || +fSale < 0) { setError("Please enter a valid sale price."); return; }
    const entry = {
      id: Date.now(),
      reg: cleanReg || null,
      partNumber: fPartNumber.trim(),
      cost: parseFloat((+fCost).toFixed(2)),
      sale: parseFloat((+fSale).toFixed(2)),
      date: fDate,
      notes: fNotes.trim(),
    };
    setParts(function(prev) {
      const updated = Object.assign({}, prev);
      updated[activePart] = prev[activePart].concat([entry]);
      return updated;
    });
    setSuccess("Part added.");
    setTimeout(function() { setSuccess(""); }, 2500);
    clearForm();
    setView("list");
  }

  function handleDelete(partType, id) {
    setParts(function(prev) {
      const updated = Object.assign({}, prev);
      updated[partType] = prev[partType].filter(function(e) { return e.id !== id; });
      return updated;
    });
  }
async function handleDeleteBooking(id) {
  if (!confirm("Delete this booking?")) return;

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Failed to delete booking.");
    return;
  }

  setBookings(function(prev) {
    return prev.filter(function(b) {
      return b.id !== id;
    });
  });
}
  const entries = parts[activePart] || [];
  const totalCost = entries.reduce(function(s, e) { return s + e.cost; }, 0);
  const totalSale = entries.reduce(function(s, e) { return s + e.sale; }, 0);
  const totalProfit = totalSale - totalCost;

  // Build trends data - usage count and profit per part type
  const trendsData = PART_TYPES.map(function(pt) {
    const ptEntries = parts[pt] || [];
    const qty = ptEntries.length;
    const cost = ptEntries.reduce(function(s, e) { return s + e.cost; }, 0);
    const sale = ptEntries.reduce(function(s, e) { return s + e.sale; }, 0);
    return { name: pt, qty: qty, cost: cost, sale: sale, profit: sale - cost };
  }).sort(function(a, b) { return b.qty - a.qty; });

  // Monthly usage for active part type
  const monthlyMap = {};
  entries.forEach(function(e) {
    const month = e.date.substring(0, 7);
    if (!monthlyMap[month]) monthlyMap[month] = { count: 0, profit: 0 };
    monthlyMap[month].count += 1;
    monthlyMap[month].profit += e.sale - e.cost;
  });
  const monthlyData = Object.keys(monthlyMap).sort().map(function(m) {
    return { month: m, count: monthlyMap[m].count, profit: monthlyMap[m].profit };
  });

  const maxBarVal = Math.max(1, Math.max.apply(null, trendsData.map(function(d) { return d.qty; })));
  const maxMonthly = Math.max(1, Math.max.apply(null, monthlyData.map(function(d) { return d.count; })));

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["list","add","trends"].map(function(v) {
          return (
            <button key={v} onClick={function() { setView(v); clearForm(); }}
              style={{ padding: "8px 18px", borderRadius: 8, border: "none", fontFamily: "inherit", fontWeight: 600, fontSize: 13, cursor: "pointer", background: view === v ? C.accent : C.card, color: view === v ? "#fff" : C.muted }}>
              {v === "list" ? "Parts Log" : v === "add" ? "+ Add Part Used" : "Trends"}
            </button>
          );
        })}
      </div>

      {view !== "trends" && (
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {PART_TYPES.map(function(pt) {
            const count = (parts[pt] || []).length;
            const active = activePart === pt;
            return (
              <button key={pt} onClick={function() { setActivePart(pt); }}
                style={{ padding: "7px 14px", borderRadius: 8, border: "2px solid " + (active ? C.accent : C.border), background: active ? C.accent + "20" : C.card, color: active ? C.accent : C.muted, fontFamily: "inherit", fontWeight: 600, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                {pt}
                {count > 0 && <span style={{ background: active ? C.accent : C.border, color: "#fff", borderRadius: 10, fontSize: 10, padding: "1px 6px", fontWeight: 700 }}>{count}</span>}
              </button>
            );
          })}
        </div>
      )}

      {view === "list" && (
        <div>
          {entries.length > 0 && (
            <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              {[
                { label: "Total Used", value: entries.length + " units", color: C.accent },
                { label: "Total Cost", value: "EUR" + totalCost.toFixed(2), color: "#e8472a" },
                { label: "Total Revenue", value: "EUR" + totalSale.toFixed(2), color: C.green },
                { label: "Total Profit", value: "EUR" + totalProfit.toFixed(2), color: totalProfit >= 0 ? C.green : "#e8472a" },
              ].map(function(stat) {
                return (
                  <div key={stat.label} style={{ background: C.card, borderRadius: 10, padding: "12px 16px", flex: 1, minWidth: 120, border: "1px solid " + C.border }}>
                    <p style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{stat.label}</p>
                    <p style={{ fontFamily: "Barlow Condensed", fontSize: 22, fontWeight: 700, color: stat.color }}>{stat.value}</p>
                  </div>
                );
              })}
            </div>
          )}

          {entries.length === 0
            ? (
              <Card>
                <p style={{ color: C.muted, textAlign: "center" }}>No {activePart} entries yet. Click Add Part Used to log one.</p>
              </Card>
            )
            : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {entries.slice().sort(function(a, b) { return b.date.localeCompare(a.date); }).map(function(e) {
                  const profit = e.sale - e.cost;
                  const margin = e.sale > 0 ? Math.round((profit / e.sale) * 100) : 0;
                  const carInfo = e.reg && cars[e.reg] ? cars[e.reg].year + " " + cars[e.reg].make + " " + cars[e.reg].model : null;
                  return (
                    <Card key={e.id} style={{ padding: 16, display: "flex", gap: 14, alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 700, fontSize: 14, fontFamily: "Barlow Condensed", letterSpacing: 0.5 }}>{e.partNumber}</span>
                          {e.reg && <Badge text={e.reg} color={C.accent} />}
                          <span style={{ fontSize: 11, color: C.muted }}>{e.date}</span>
                        </div>
                        {carInfo && <p style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{carInfo}</p>}
                        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 12, color: "#e8472a" }}>Cost: EUR{e.cost.toFixed(2)}</span>
                          <span style={{ fontSize: 12, color: C.green }}>Sale: EUR{e.sale.toFixed(2)}</span>
                          <span style={{ fontSize: 12, color: profit >= 0 ? C.green : "#e8472a", fontWeight: 700 }}>Profit: EUR{profit.toFixed(2)} ({margin}%)</span>
                        </div>
                        {e.notes && <p style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{e.notes}</p>}
                      </div>
                      <button onClick={function() { handleDelete(activePart, e.id); }}
                        style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 18, padding: "4px 8px" }}>x</button>
                    </Card>
                  );
                })}
              </div>
            )
          }
        </div>
      )}

      {view === "add" && (
        <Card>
          <h3 style={{ fontFamily: "Barlow Condensed", fontSize: 22, marginBottom: 4 }}>Log Part Used</h3>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>Recording: <strong style={{ color: C.accent }}>{activePart}</strong></p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
            <Input label="Part Number *" value={fPartNumber} onChange={function(e) { setFPartNumber(e.target.value); }} placeholder="e.g. OC115" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.5, textTransform: "uppercase" }}>Vehicle Reg (optional)</label>
              <select value={fReg} onChange={function(e) { setFReg(e.target.value); }}
                style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 8, padding: "11px 14px", color: fReg ? C.text : C.muted, fontSize: 14, outline: "none", fontFamily: "inherit" }}>
                <option value="">-- No specific vehicle --</option>
                {Object.entries(cars).map(function(entry) {
                  return (
                    <option key={entry[0]} value={entry[0]}>{entry[0]} - {entry[1].year + " " + entry[1].make + " " + entry[1].model}</option>
                  );
                })}
              </select>
            </div>
            <Input label="Cost Price (EUR) *" value={fCost} onChange={function(e) { setFCost(e.target.value); }} placeholder="e.g. 12.50" />
            <Input label="Sale Price (EUR) *" value={fSale} onChange={function(e) { setFSale(e.target.value); }} placeholder="e.g. 25.00" />
            <DateInput label="Date Used" value={fDate} onChange={function(e) { setFDate(e.target.value); }} />
            <Input label="Notes (optional)" value={fNotes} onChange={function(e) { setFNotes(e.target.value); }} placeholder="e.g. OEM replacement" />
          </div>
          {fCost && fSale && !isNaN(+fCost) && !isNaN(+fSale) && (
            <div style={{ background: C.card, borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", gap: 20 }}>
              <span style={{ fontSize: 13, color: "#e8472a" }}>Cost: EUR{(+fCost).toFixed(2)}</span>
              <span style={{ fontSize: 13, color: C.green }}>Sale: EUR{(+fSale).toFixed(2)}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: (+fSale - +fCost) >= 0 ? C.green : "#e8472a" }}>
                Profit: EUR{(+fSale - +fCost).toFixed(2)}
                {+fSale > 0 ? " (" + Math.round(((+fSale - +fCost) / +fSale) * 100) + "% margin)" : ""}
              </span>
            </div>
          )}
          {error && <p style={{ color: "#e8472a", fontSize: 13, background: "#e8472a15", padding: "10px 14px", borderRadius: 8, marginBottom: 12 }}>{error}</p>}
          {success && <p style={{ color: C.green, fontSize: 13, background: C.green + "20", padding: "10px 14px", borderRadius: 8, marginBottom: 12 }}>{success}</p>}
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="ghost" small onClick={function() { clearForm(); setView("list"); }}>Cancel</Btn>
            <Btn onClick={handleAdd} disabled={!fPartNumber || !fCost || !fSale}>Save Part Entry</Btn>
          </div>
        </Card>
      )}

      {view === "trends" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <h3 style={{ fontFamily: "Barlow Condensed", fontSize: 22, marginBottom: 4 }}>Parts Usage Overview</h3>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>All part types ranked by usage</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {trendsData.map(function(d) {
                const barWidth = d.qty === 0 ? 0 : Math.round((d.qty / maxBarVal) * 100);
                return (
                  <div key={d.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: d.qty > 0 ? C.text : C.muted }}>{d.name}</span>
                      <div style={{ display: "flex", gap: 16 }}>
                        <span style={{ fontSize: 12, color: C.muted }}>{d.qty} used</span>
                        {d.qty > 0 && (
                          <span style={{ fontSize: 12, fontWeight: 700, color: d.profit >= 0 ? C.green : "#e8472a" }}>EUR{d.profit.toFixed(2)} profit</span>
                        )}
                      </div>
                    </div>
                    <div style={{ background: C.card, borderRadius: 4, height: 10, overflow: "hidden" }}>
                      <div style={{ width: barWidth + "%", height: "100%", background: d.qty > 0 ? C.accent : C.border, borderRadius: 4, transition: "width 0.4s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <h3 style={{ fontFamily: "Barlow Condensed", fontSize: 22, marginBottom: 4 }}>Monthly Breakdown</h3>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 16 }}>Select a part type to see monthly usage</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              {PART_TYPES.map(function(pt) {
                const active = activePart === pt;
                return (
                  <button key={pt} onClick={function() { setActivePart(pt); }}
                    style={{ padding: "5px 12px", borderRadius: 6, border: "2px solid " + (active ? C.accent : C.border), background: active ? C.accent + "20" : C.card, color: active ? C.accent : C.muted, fontFamily: "inherit", fontWeight: 600, fontSize: 11, cursor: "pointer" }}>
                    {pt}
                  </button>
                );
              })}
            </div>
            {monthlyData.length === 0
              ? <p style={{ color: C.muted, textAlign: "center", fontSize: 13 }}>No data for {activePart} yet.</p>
              : (
                <div>
                  <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                    {[
                      { label: "Total Used", value: entries.length + " units" },
                      { label: "Revenue", value: "EUR" + totalSale.toFixed(2) },
                      { label: "Profit", value: "EUR" + totalProfit.toFixed(2) },
                      { label: "Avg Margin", value: totalSale > 0 ? Math.round((totalProfit / totalSale) * 100) + "%" : "N/A" },
                    ].map(function(s) {
                      return (
                        <div key={s.label} style={{ background: C.card, borderRadius: 8, padding: "10px 14px", flex: 1, minWidth: 100, border: "1px solid " + C.border }}>
                          <p style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>{s.label}</p>
                          <p style={{ fontFamily: "Barlow Condensed", fontSize: 20, fontWeight: 700, color: C.accent }}>{s.value}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 120, padding: "0 4px" }}>
                    {monthlyData.map(function(m) {
                      const barH = Math.round((m.count / maxMonthly) * 100);
                      const monthLabel = new Date(m.month + "-01").toLocaleDateString("en-IE", { month: "short", year: "2-digit" });
                      return (
                        <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                          <span style={{ fontSize: 10, color: C.green, fontWeight: 700 }}>{m.count}</span>
                          <div style={{ width: "100%", background: C.accent, borderRadius: "4px 4px 0 0", height: barH + "%", minHeight: m.count > 0 ? 8 : 0, transition: "height 0.4s" }} />
                          <span style={{ fontSize: 9, color: C.muted, textAlign: "center" }}>{monthLabel}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            }
          </Card>

          <Card>
            <h3 style={{ fontFamily: "Barlow Condensed", fontSize: 22, marginBottom: 16 }}>Profit Summary</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {trendsData.filter(function(d) { return d.qty > 0; }).map(function(d) {
                const margin = d.sale > 0 ? Math.round((d.profit / d.sale) * 100) : 0;
                return (
                  <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid " + C.border }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{d.name}</span>
                    <div style={{ display: "flex", gap: 20, fontSize: 12 }}>
                      <span style={{ color: "#e8472a" }}>Cost EUR{d.cost.toFixed(2)}</span>
                      <span style={{ color: C.green }}>Revenue EUR{d.sale.toFixed(2)}</span>
                      <span style={{ color: d.profit >= 0 ? C.green : "#e8472a", fontWeight: 700 }}>EUR{d.profit.toFixed(2)} ({margin}%)</span>
                    </div>
                  </div>
                );
              })}
              {trendsData.filter(function(d) { return d.qty > 0; }).length === 0 && (
                <p style={{ color: C.muted, textAlign: "center", fontSize: 13 }}>No parts logged yet. Add some entries to see profit trends.</p>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}



function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const locked = attempts >= 5;

  function handleLogin() {
    if (locked) return;
    if (email.trim().toLowerCase() === ADMIN_USER && password === ADMIN_PASS) {
      setError(""); onSuccess();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setError(next >= 5 ? "Too many failed attempts. Please refresh to try again." : "Incorrect email or password. " + (5 - next) + " attempt" + (5 - next !== 1 ? "s" : "") + " remaining.");
    }
  }

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 36 }}>&#128272;</div>
          <h2 style={{ fontFamily: "Barlow Condensed", fontSize: 26, marginTop: 8, color: C.accent }}>Admin Login</h2>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>Staff Access Only</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Input label="Email" value={email} onChange={function(e) { setEmail(e.target.value); }} placeholder="Email address" />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 0.5, textTransform: "uppercase" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input type={showPw ? "text" : "password"} value={password}
                onChange={function(e) { setPassword(e.target.value); }}
                onKeyDown={function(e) { if (e.key === "Enter") handleLogin(); }}
                placeholder="Password"
                style={{ width: "100%", background: C.card, border: "1px solid " + C.border, borderRadius: 8, padding: "11px 44px 11px 14px", color: C.text, fontSize: 15, outline: "none", fontFamily: "inherit" }}
                onFocus={function(e) { e.target.style.borderColor = C.accent; }}
                onBlur={function(e) { e.target.style.borderColor = C.border; }} />
              <button onClick={function() { setShowPw(function(p) { return !p; }); }}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 14 }}>
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error && <p style={{ color: "#e8472a", fontSize: 13, background: "#e8472a15", padding: "10px 14px", borderRadius: 8 }}>{error}</p>}
          <Btn onClick={handleLogin} disabled={locked || !email || !password} style={{ justifyContent: "center" }}>Sign In</Btn>
        </div>
      </Card>
    </div>
  );
}

export default function App() {
  const [cars, setCars] = useState({});
  const [parts, setParts] = useState(INITIAL_PARTS);
  const [slots, setSlots] = useState(generateSlots());
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("customer");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminLoginTime, setAdminLoginTime] = useState(null);
useEffect(() => {
  async function loadVehicles() {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    const loadedCars = {};

    data.forEach(function(v) {
      loadedCars[v.registration] = {
        make: v.make,
        model: v.model,
        year: null,
        colour: "",
        owner: v.owner_name,
        mobile: v.mobile,
        email: v.email,
        vin: v.vin_number || "",
        nctExpiry: v.nct_expiry || "",
        notes: v.notes || "",
        history: [],
        services: ALL_SERVICES
      };
    });

    setCars(loadedCars);

    console.log("Loaded vehicles:", loadedCars);
  }
 async function loadBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setBookings(data);

    console.log("Loaded bookings:", data);
  }

  // <<< THEN CHANGE THIS >>>

  loadVehicles();
  loadBookings();

}, []);


  function handleLogout() { setAdminAuthed(false); setTab("customer"); }

  return (
    <div style={{ background: "#f0f0f0", minHeight: "100vh" }}>
      <style>{css}</style>
      <header style={{ background: "#fafafa", borderBottom: "1px solid " + C.border, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "0 24px" }}>
<div
  style={{
    width: "100%",
    position: "relative",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}
>          <img src={LOGO_URI} alt="OB Autos" style={{ height: 48, objectFit: "contain", cursor: "default" }} onDoubleClick={function() { setTab("admin"); }} title="" />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {tab === "admin" && (
              <div style={{ display: "flex", gap: 4, background: C.card, padding: 4, borderRadius: 10 }}>
                <button onClick={function() { setTab("customer"); }} style={{ padding: "7px 16px", borderRadius: 7, border: "none", fontFamily: "inherit", fontWeight: 600, fontSize: 12, cursor: "pointer", background: C.accent, color: "#fff" }}>Back to Booking</button>
              </div>
            )}
            {adminAuthed && tab === "admin" && (
              <button onClick={handleLogout} style={{ padding: "7px 12px", borderRadius: 7, border: "1px solid " + C.border, fontFamily: "inherit", fontWeight: 600, fontSize: 12, cursor: "pointer", background: "transparent", color: C.muted }}>Sign Out</button>
            )}
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", background: "#ffffff", minHeight: "calc(100vh - 64px)" }}>
        {tab === "customer"
          ? <CustomerPortal cars={cars} setCars={setCars} slots={slots} setSlots={setSlots} bookings={bookings} setBookings={setBookings} />
          : adminAuthed
?<AdminPanel
  cars={cars}
  setCars={setCars}
  bookings={bookings}
  setBookings={setBookings}
  lastLoginTime={adminLoginTime}
/>            : <AdminLogin onSuccess={function() { setAdminAuthed(true); setAdminLoginTime(Date.now()); }} />
        }
      </main>
    </div>
  );
}
