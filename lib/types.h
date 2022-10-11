/*
 * BSD LICENSE
 *
 * Copyright(c) 2014-2022 Intel Corporation. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in
 *     the documentation and/or other materials provided with the
 *     distribution.
 *   * Neither the name of Intel Corporation nor the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.O
 *
 */

/**
 * @brief Miscellaneous data type definitions and macro definitions
 */

#ifndef __PQOS_TYPES_H__
#define __PQOS_TYPES_H__

#ifdef DEBUG
#include <assert.h>
#endif

#ifdef __cplusplus
extern "C" {
#endif

#ifndef DIM
#define DIM(x) (sizeof(x) / sizeof(x[0]))
#endif

#define UNUSED_PARAM(x) (void)(x)

#ifdef DEBUG
#define ASSERT assert
#else
#define ASSERT(x)
#endif

#ifdef __cplusplus
}
#endif

#if __GNUC__ >= 4
#ifndef PQOS_API
#define PQOS_API __attribute__((visibility("default")))
#endif
#ifndef PQOS_LOCAL
#define PQOS_LOCAL __attribute__((visibility("hidden")))
#endif
#else
#define PQOS_API
#define PQOS_LOCAL
#endif

#ifndef PQOS_STATIC
#define PQOS_STATIC static
#else
#define PQOS_STATIC
#endif

#endif /* __PQOS_TYPES_H__ */
