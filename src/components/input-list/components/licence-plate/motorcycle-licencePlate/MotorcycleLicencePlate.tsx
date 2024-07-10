import React, {FC, useEffect, useState} from 'react'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import LicenceLabel from "../../../../../assets/images/motor-plate-default.svg";

export interface IMotorcycleLicencePlate {
  motorFirstNumber?: string;
  motorSecondNumber?: string
}

interface Props {
  onComplete?: (data: IMotorcycleLicencePlate, e: React.ChangeEvent<HTMLInputElement>) => void
  onChange?: (data: IMotorcycleLicencePlate) => void
  defaultValue?: IMotorcycleLicencePlate
  disabled?: boolean;
  isError?: boolean
}



const MotorcycleLicencePlate: FC<Props> = ({onComplete, onChange, defaultValue, disabled, isError}) => {

  const [tagValue, setTagValue] = useState<IMotorcycleLicencePlate>({
    motorFirstNumber: defaultValue?.motorFirstNumber || "5",
    motorSecondNumber: defaultValue?.motorSecondNumber || "1"
  });

  useEffect(() => {
    setTagValue(defaultValue!)
  }, [defaultValue]);


  const handleChangeFirstNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const newTagValue = {
      ...tagValue,
      motorFirstNumber: value
    }

    setTagValue(newTagValue)
    if (onChange) {
      onChange(newTagValue)
    }

    if(value.length === 3) {

      const input = e.target.parentNode?.parentNode?.nextSibling?.firstChild?.firstChild as HTMLInputElement
      input?.focus()

      if(tagValue?.motorSecondNumber?.length === 5) {
        return onComplete ? onComplete(newTagValue, e) : {}
      }
    }
  }

  const handleChangeSecondNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const newTagValue = {
      ...tagValue,
      motorSecondNumber: value
    }

    setTagValue(newTagValue)
    if (onChange) {
      onChange(newTagValue)
    }

    if(value.length === 5 && tagValue?.motorFirstNumber?.length === 3) {
      return onComplete ? onComplete(newTagValue, e) : {}
    }
  }

  return (
    <Box
      id={"MotorTag"}
      sx={{
        backgroundImage: `url(${LicenceLabel})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
      borderRadius={1}
      display={'inline-flex'}
      minWidth={230}
      maxWidth={230}
      height={46}
      style={{direction: "rtl"}}
    >
      <Box
        id={"motorcycle-tag"}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'71%'}
        height={'100%'}
        px={'4px'}
        py={'4px'}
        dir={'ltr'}
        gap={2}
      >
        <TextField
          id={"motorFirstNumber"}
          disabled={disabled}
          value={tagValue?.motorFirstNumber ?? ''}
          onChange={handleChangeFirstNumber}
          error={(!!tagValue?.motorFirstNumber && tagValue?.motorFirstNumber?.length < 3) || isError}
          InputProps={{ inputProps: { maxLength: 3 } }}
          sx={{
            minWidth: 60,
            maxWidth: 60,
            height: '100%',
            '& .MuiInputBase-root.MuiOutlinedInput-root': {
              height: '100% !important',
            },
            '& input': {
              width: 60,
              textAlign: 'center',
              height: '100% !important',
              fontSize: 18,
              p: 0,
              py: '0px !important',
            },
            "& fieldset": {
              border: (!!tagValue?.motorFirstNumber && tagValue?.motorFirstNumber?.length < 3 ) || isError ? "" : "none"
            }
          }}
        />

        <TextField
          id={"motorSecondNumber"}
          disabled={disabled}
          value={tagValue?.motorSecondNumber ?? ''}
          onChange={handleChangeSecondNumber}
          error={(!!tagValue?.motorSecondNumber && tagValue?.motorSecondNumber?.length < 5) || isError}
          InputProps={{ inputProps: { maxLength: 5 } }}
          sx={{
            width: '100%',
            height: '100%',
            '& .MuiInputBase-root.MuiOutlinedInput-root': {
              height: '100% !important',
            },
            '& input': {
              textAlign: 'center',
              height: '100% !important',
              fontSize: 18,
              p: 0,
              py: '0px !important',
            },
            "& fieldset": {
              border: (!!tagValue?.motorSecondNumber && tagValue?.motorSecondNumber?.length < 5) || isError ? "" : "none"
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default MotorcycleLicencePlate
