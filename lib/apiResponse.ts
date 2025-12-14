/**
 * Send a standardized **successful API response**.
 *
 * This utility ensures consistent structure for all success responses
 * across your API — improving maintainability, readability, and front-end predictability.
 *
 * ✅ **Usage Example:**
 * ```ts
 * sendSuccessResponse({
 *   message: "Operation successful",
 *   data: result,
 *   statusCode: 201
 * });
 * ```
 *
 * ✅ **Standard Response Format:**
 * ```json
 * {
 *   "success": true,
 *   "message": "Operation successful",
 *   "data": { ... }
 * }
 * ```
 *
 * @param {object} options - Configuration object.
 * @param {string} [options.message] - Optional message describing the result.
 * @param {any} [options.data=null] - Optional response payload (default: null).
 * @param {number} [options.statusCode=200] - HTTP status code (default: 200).
 *
 * @returns {NextResponse} NextJs JSON response with `{ success, message, data }` structure.
 */
import { NextResponse } from "next/server";
import { AppError } from "./error";
import z from "zod";

export function response<T>({
    message,
    data,
    statusCode = 200,
    success = true,
}: {
    message?: string;
    data?: T;
    statusCode?: number;
    success?: boolean;
}) {
    return NextResponse.json(
        {
            message,
            data,
            statusCode,
            success,
        },
        {
            status: statusCode,
        }
    );
}

export function errorResponse(error: unknown) {
    console.error("<|-|- [error log from 'errorResponse fn'] -|-|> ");
    if (error instanceof AppError) {
        return response({
            message: error.message,
            statusCode: error.statusCode,
            success: false,
            data: error.data || null,
        });
    } else if (error instanceof z.ZodError) {
        // Map Zod errors to a cleaner format for the API response
        const errors = error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
        }));

        return response({
            message: "Validation failed.",
            data: {
                details: errors,
            },
            success: false,
            statusCode: 400,
        });
    } else if (error instanceof Error) {
        // Regular JS errorƒ
        return response({
            message: error.message || "Something went wrong on server",
            statusCode: 500,
            success: false,
            data: null,
        });
    } else {
        // Fallback for unknown errors
        return response({
            message: "Something went wrong on server",
            statusCode: 500,
            success: false,
            data: null,
        });
    }
}
